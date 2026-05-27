"use client";

/**
 * Admin moderation dashboard.
 */

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

interface Report {
  id: string;

  reason: string;

  description?: string;

  status: string;

  listing: {
    id: string;

    title: string;
  };

  reporter: {
    name: string;

    email: string;
  };
}

interface AdminStats {
  users: number;

  listings: number;

  dorms: number;

  reports: number;
}

export default function AdminPage() {
  const [
    reports,
    setReports,
  ] =
    useState<
      Report[]
    >([]);

  const [
    stats,
    setStats,
  ] =
    useState<
      AdminStats
    >({
      users: 0,

      listings: 0,

      dorms: 0,

      reports: 0,
    });

  const [
    loading,
    setLoading,
  ] =
    useState(
      true
    );

  const [
    query,
    setQuery,
  ] =
    useState("");

  const [
    status,
    setStatus,
  ] =
    useState(
      "ALL"
    );

  async function fetchDashboard() {
    try {
      setLoading(
        true
      );

      const [
        reportsRes,
        statsRes,
      ] =
        await Promise.all(
          [
            fetch(
              "/api/reports"
            ),

            fetch(
              "/api/admin/stats"
            ),
          ]
        );

      if (
        !reportsRes.ok
      ) {
        throw new Error();
      }

      const reportsData =
        await reportsRes.json();

      setReports(
        reportsData
      );

      if (
        statsRes.ok
      ) {
        const statsData =
          await statsRes.json();

        setStats(
          statsData
        );
      }
    } catch {
      toast.error(
        "Failed to load admin dashboard"
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  async function resolveReport(
    id: string
  ) {
    try {
      const response =
        await fetch(
          `/api/reports/${id}`,
          {
            method:
              "PATCH",
          }
        );

      if (
        !response.ok
      ) {
        throw new Error();
      }

      toast.success(
        "Report resolved"
      );

      fetchDashboard();
    } catch {
      toast.error(
        "Failed to resolve report"
      );
    }
  }

  async function removeListing(
    id: string
  ) {
    if (
      !confirm(
        "Remove listing?"
      )
    ) {
      return;
    }

    try {
      const response =
        await fetch(
          `/api/reports/${id}`,
          {
            method:
              "DELETE",
          }
        );

      if (
        !response.ok
      ) {
        throw new Error();
      }

      toast.success(
        "Listing removed"
      );

      fetchDashboard();
    } catch {
      toast.error(
        "Failed to remove listing"
      );
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  const filtered =
    useMemo(
      () =>
        reports.filter(
          (
            report
          ) => {
            const title =
              (
                report
                  .listing
                  ?.title ||
                ""
              ).toLowerCase();

            const matchSearch =
              title.includes(
                query.toLowerCase()
              );

            const matchStatus =
              status ===
                "ALL" ||
              report.status ===
                status;

            return (
              matchSearch &&
              matchStatus
            );
          }
        ),

      [
        reports,
        query,
        status,
      ]
    );

  if (
    loading
  ) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-black">
            Admin Dashboard
          </h1>

          <p className="mt-3 text-slate-600">
            Platform moderation
            and analytics
          </p>
        </div>

        <button
          onClick={
            fetchDashboard
          }
          className="
            rounded-2xl
            border
            px-5
            py-3
          "
        >
          Refresh
        </button>
      </div>

      {/* STATS */}

      <div className="grid gap-6 md:grid-cols-4">
        {[
          [
            "Users",
            stats.users,
          ],

          [
            "Listings",
            stats.listings,
          ],

          [
            "Dorms",
            stats.dorms,
          ],

          [
            "Reports",
            stats.reports,
          ],
        ].map(
          (
            item
          ) => (
            <div
              key={
                item[0]
              }
              className="
                rounded-3xl
                bg-white/70
                p-8
              "
            >
              <p className="text-slate-500">
                {
                  item[0]
                }
              </p>

              <h2 className="mt-4 text-5xl font-black">
                {
                  item[1]
                }
              </h2>
            </div>
          )
        )}
      </div>

      {/* FILTERS */}

      <div className="flex gap-4">
        <input
          value={
            query
          }
          onChange={(
            e
          ) =>
            setQuery(
              e.target
                .value
            )
          }
          placeholder="Search reports..."
          className="
            h-12
            rounded-2xl
            border
            px-5
          "
        />

        <select
          value={
            status
          }
          onChange={(
            e
          ) =>
            setStatus(
              e.target
                .value
            )
          }
          className="
            h-12
            rounded-2xl
            border
            px-5
          "
        >
          <option>
            ALL
          </option>

          <option>
            OPEN
          </option>

          <option>
            RESOLVED
          </option>
        </select>
      </div>

      {/* REPORTS */}

      {filtered.length ===
        0 && (
        <div className="rounded-3xl bg-white/70 p-12 text-center">
          No reports
        </div>
      )}

      <div className="space-y-6">
        {filtered.map(
          (
            report
          ) => (
            <div
              key={
                report.id
              }
              className="
                rounded-3xl
                bg-white/70
                p-8
              "
            >
              <h2 className="text-2xl font-bold">
                {
                  report
                    .listing
                    ?.title
                }
              </h2>

              <p className="mt-2 text-slate-500">
                {
                  report
                    .reporter
                    .name
                }
              </p>

              <p className="mt-5">
                {
                  report.description
                }
              </p>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() =>
                    resolveReport(
                      report.id
                    )
                  }
                  className="
                    rounded-2xl
                    bg-green-600
                    px-5
                    py-3
                    text-white
                  "
                >
                  Resolve
                </button>

                <button
                  onClick={() =>
                    removeListing(
                      report.id
                    )
                  }
                  className="
                    rounded-2xl
                    bg-red-600
                    px-5
                    py-3
                    text-white
                  "
                >
                  Remove
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
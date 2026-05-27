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

export default function AdminPage() {
  const [
    reports,
    setReports,
  ] =
    useState<
      Report[]
    >([]);

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

  async function fetchReports() {
    try {
      setLoading(
        true
      );

      const response =
        await fetch(
          "/api/reports"
        );

      if (
        !response.ok
      ) {
        throw new Error();
      }

      const data =
        await response.json();

      setReports(
        data
      );
    } catch {
      toast.error(
        "Failed to load reports"
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

      fetchReports();
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

      fetchReports();
    } catch {
      toast.error(
        "Failed to remove listing"
      );
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);

  const filtered =
    useMemo(
      () =>
        reports.filter(
          (
            report
          ) => {
            const matchesSearch =
              report.listing.title
                .toLowerCase()
                .includes(
                  query.toLowerCase()
                );

            const matchesStatus =
              status ===
                "ALL" ||
              report.status ===
                status;

            return (
              matchesSearch &&
              matchesStatus
            );
          }
        ),

      [
        reports,
        query,
        status,
      ]
    );

  const stats = {
    total:
      reports.length,

    open:
      reports.filter(
        (
          report
        ) =>
          report.status ===
          "OPEN"
      ).length,

    resolved:
      reports.filter(
        (
          report
        ) =>
          report.status ===
          "RESOLVED"
      ).length,
  };

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
            Reports &
            moderation
          </p>
        </div>

        <button
          onClick={
            fetchReports
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

      <div className="grid gap-6 md:grid-cols-3">
        {[
          [
            "Reports",
            stats.total,
          ],

          [
            "Open",
            stats.open,
          ],

          [
            "Resolved",
            stats.resolved,
          ],
        ].map(
          (
            card
          ) => (
            <div
              key={
                card[0]
              }
              className="
                rounded-3xl
                bg-white/70
                p-8
              "
            >
              <p className="text-slate-500">
                {
                  card[0]
                }
              </p>

              <h2 className="mt-4 text-5xl font-black">
                {
                  card[1]
                }
              </h2>
            </div>
          )
        )}
      </div>

      <div className="flex flex-wrap gap-4">
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
          placeholder="Search..."
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
              <h2 className="text-2xl font-black">
                {
                  report
                    .listing
                    .title
                }
              </h2>

              <p className="mt-2 text-slate-500">
                {
                  report
                    .reporter
                    .name
                }
              </p>

              <p className="mt-6">
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
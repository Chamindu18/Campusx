"use client";

/**
 * Admin analytics.
 */

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

interface Analytics {
  users: number;

  listings: number;

  dorms: number;

  reports: number;

  notifications: number;
}

export default function AnalyticsPage() {
  const [
    analytics,
    setAnalytics,
  ] =
    useState<
      Analytics
    >({
      users: 0,

      listings: 0,

      dorms: 0,

      reports: 0,

      notifications:
        0,
    });

  const [
    loading,
    setLoading,
  ] =
    useState(
      true
    );

  async function load() {
    try {
      setLoading(
        true
      );

      const response =
        await fetch(
          "/api/admin/stats"
        );

      if (
        !response.ok
      ) {
        throw new Error();
      }

      const data =
        await response.json();

      setAnalytics(
        data
      );
    } catch {
      toast.error(
        "Failed to load analytics"
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (
    loading
  ) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Loading analytics...
      </div>
    );
  }

  const cards = [
    [
      "Users",
      analytics.users,
    ],

    [
      "Listings",
      analytics.listings,
    ],

    [
      "Dorms",
      analytics.dorms,
    ],

    [
      "Reports",
      analytics.reports,
    ],

    [
      "Notifications",
      analytics.notifications,
    ],
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black sm:text-4xl md:text-5xl">
          Analytics
        </h1>

        <p className="mt-3 text-slate-600">
          Platform overview
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map(
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

              <h2 className="mt-4 text-6xl font-black">
                {
                  card[1]
                }
              </h2>
            </div>
          )
        )}
      </div>

      <div className="rounded-3xl bg-white/70 p-10">
        <h2 className="text-3xl font-black">
          Platform Health
        </h2>

        <div className="mt-8 space-y-4">
          <div>
            Users:
            {" "}
            {
              analytics.users
            }
          </div>

          <div>
            Listings:
            {" "}
            {
              analytics.listings
            }
          </div>

          <div>
            Dorms:
            {" "}
            {
              analytics.dorms
            }
          </div>

          <div>
            Reports:
            {" "}
            {
              analytics.reports
            }
          </div>
        </div>
      </div>
    </div>
  );
}
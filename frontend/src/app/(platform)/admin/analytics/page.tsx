"use client";

/**
 * Admin analytics dashboard.
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

interface StatCard {
  title: string;
  value: number;
}

export default function AnalyticsPage() {
  const [
    analytics,
    setAnalytics,
  ] = useState<Analytics>({
    users: 0,
    listings: 0,
    dorms: 0,
    reports: 0,
    notifications: 0,
  });

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(false);

  async function load() {
    try {
      setLoading(true);
      setError(false);

      const response =
        await fetch(
          "/api/admin/stats"
        );

      if (!response.ok) {
        throw new Error();
      }

      const data =
        await response.json();

      setAnalytics(data);
    } catch {
      setError(true);

      toast.error(
        "Failed to load analytics"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const cards: StatCard[] = [
    {
      title: "Users",
      value: analytics.users,
    },
    {
      title: "Listings",
      value: analytics.listings,
    },
    {
      title: "Dorms",
      value: analytics.dorms,
    },
    {
      title: "Reports",
      value: analytics.reports,
    },
    {
      title: "Notifications",
      value:
        analytics.notifications,
    },
  ];

  if (loading) {
    return (
      <div
        className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {Array.from({
          length: 5,
        }).map((_, index) => (
          <div
            key={index}
            className="
              h-40
              animate-pulse
              rounded-3xl
              bg-white/70
            "
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          rounded-3xl
          bg-white/70
          p-6
          md:p-8
        "
      >
        <h2
          className="
            text-xl
            font-bold
            text-red-600
          "
        >
          Failed to load analytics
        </h2>

        <button
          onClick={load}
          className="
            mt-4
            rounded-2xl
            bg-blue-600
            px-5
            py-3
            text-white
          "
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 md:space-y-10">
      {/* HEADER */}

      <div>
        <h1
          className="
            text-3xl
            font-black
            sm:text-4xl
            md:text-5xl
          "
        >
          Analytics
        </h1>

        <p
          className="
            mt-3
            text-slate-600
          "
        >
          Platform overview
        </p>
      </div>

      {/* STATS */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {cards.map(
          (card) => (
            <div
              key={card.title}
              className="
                rounded-3xl
                bg-white/70
                p-6
                md:p-8
              "
            >
              <p
                className="
                  text-slate-500
                "
              >
                {card.title}
              </p>

              <h2
                className="
                  mt-4
                  text-4xl
                  font-black
                  md:text-6xl
                "
              >
                {card.value.toLocaleString()}
              </h2>
            </div>
          )
        )}
      </div>

      {/* HEALTH */}

      <div
        className="
          rounded-3xl
          bg-white/70
          p-6
          md:p-10
        "
      >
        <h2
          className="
            text-2xl
            font-black
            md:text-3xl
          "
        >
          Platform Health
        </h2>

        <div
          className="
            mt-8

            grid
            grid-cols-1
            gap-4

            md:grid-cols-2
          "
        >
          <div>
            Users:{" "}
            {analytics.users}
          </div>

          <div>
            Listings:{" "}
            {analytics.listings}
          </div>

          <div>
            Dorms:{" "}
            {analytics.dorms}
          </div>

          <div>
            Reports:{" "}
            {analytics.reports}
          </div>
        </div>
      </div>
    </div>
  );
}
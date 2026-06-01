"use client";

/**
 * Admin system monitor.
 */

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

interface SystemStats {
  users: number;
  listings: number;
  dorms: number;
  reports: number;
  notifications: number;
  server: string;
}

interface StatCard {
  label: string;
  value: string | number;
}

export default function AdminSystemPage() {
  const [
    stats,
    setStats,
  ] = useState<SystemStats>({
    users: 0,
    listings: 0,
    dorms: 0,
    reports: 0,
    notifications: 0,
    server: "Unknown",
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
          "/api/admin/system"
        );

      if (!response.ok) {
        throw new Error();
      }

      const data =
        await response.json();

      setStats(data);
    } catch {
      setError(true);

      toast.error(
        "Failed to load system information"
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
      label: "Users",
      value: stats.users,
    },
    {
      label: "Listings",
      value: stats.listings,
    },
    {
      label: "Dorms",
      value: stats.dorms,
    },
    {
      label: "Reports",
      value: stats.reports,
    },
    {
      label: "Notifications",
      value:
        stats.notifications,
    },
    {
      label: "Server",
      value: stats.server,
    },
  ];

  if (loading) {
    return (
      <div
        className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-3
        "
      >
        {Array.from({
          length: 6,
        }).map((_, i) => (
          <div
            key={i}
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
        "
      >
        <h2
          className="
            text-xl
            font-bold
            text-red-600
          "
        >
          Failed to load system information
        </h2>

        <button
          type="button"
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
    <div
      className="
        space-y-8
        md:space-y-10
      "
    >
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
          System
        </h1>

        <p
          className="
            mt-3
            text-slate-600
          "
        >
          Platform monitoring
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
          (item) => (
            <div
              key={item.label}
              className="
                rounded-3xl
                bg-white/70
                p-5
                md:p-8
              "
            >
              <p
                className="
                  text-slate-500
                "
              >
                {item.label}
              </p>

              <h2
                className="
                  mt-4
                  break-all
                  text-3xl
                  font-black
                  sm:text-4xl
                "
              >
                {item.value}
              </h2>
            </div>
          )
        )}
      </div>

      {/* REFRESH */}

      <button
        type="button"
        onClick={load}
        className="
          rounded-2xl

          bg-slate-900

          px-6
          py-3

          text-white

          transition

          hover:bg-slate-800

          focus:outline-none
          focus:ring-4
          focus:ring-slate-300
        "
      >
        Refresh
      </button>
    </div>
  );
}
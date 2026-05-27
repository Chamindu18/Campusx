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

export default function AdminSystemPage() {
  const [
    stats,
    setStats,
  ] =
    useState<SystemStats>({
      users: 0,

      listings: 0,

      dorms: 0,

      reports: 0,

      notifications: 0,

      server:
        "Unknown",
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
          "/api/admin/system"
        );

      if (
        !response.ok
      ) {
        throw new Error();
      }

      const data =
        await response.json();

      setStats(
        data
      );
    } catch {
      toast.error(
        "Failed to load system"
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
        Loading system...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-5xl font-black">
          System
        </h1>

        <p className="mt-3 text-slate-600">
          Platform monitoring
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
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

          [
            "Notifications",
            stats.notifications,
          ],

          [
            "Server",
            stats.server,
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

              <h2 className="mt-4 text-4xl font-black">
                {
                  item[1]
                }
              </h2>
            </div>
          )
        )}
      </div>

      <button
        onClick={
          load
        }
        className="
          rounded-2xl
          bg-slate-900
          px-6
          py-3
          text-white
        "
      >
        Refresh
      </button>
    </div>
  );
}
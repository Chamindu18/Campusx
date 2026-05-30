"use client";

/**
 * Admin audit logs.
 */

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

interface Log {
  id: string;

  action: string;

  createdAt: string;

  user?: {
    name: string;
  };
}

export default function AdminLogsPage() {
  const [
    logs,
    setLogs,
  ] =
    useState<
      Log[]
    >([]);

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
          "/api/admin/logs"
        );

      if (
        !response.ok
      ) {
        throw new Error();
      }

      const data =
        await response.json();

      setLogs(
        data
      );
    } catch {
      toast.error(
        "Failed to load logs"
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
        Loading logs...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black sm:text-4xl md:text-5xl">
          Audit Logs
        </h1>

        <p className="mt-3 text-slate-600">
          Track platform activity
        </p>
      </div>

      {logs.length ===
        0 && (
        <div className="rounded-3xl bg-white/70 p-12 text-center">
          No logs
        </div>
      )}

      <div className="space-y-5">
        {logs.map(
          (
            log
          ) => (
            <div
              key={
                log.id
              }
              className="
                rounded-3xl
                bg-white/70
                p-8
              "
            >
              <h2 className="text-xl font-black">
                {
                  log.action
                }
              </h2>

              <p className="mt-2 text-slate-500">
                {
                  log.user
                    ?.name
                }
              </p>

              <p className="mt-3 text-sm text-slate-400">
                {new Date(
                  log.createdAt
                ).toLocaleString()}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
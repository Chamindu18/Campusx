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
  ] = useState<Log[]>([]);

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
          "/api/admin/logs"
        );

      if (!response.ok) {
        throw new Error();
      }

      const data =
        await response.json();

      setLogs(data);
    } catch {
      setError(true);

      toast.error(
        "Failed to load logs"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-5">
        {Array.from({
          length: 5,
        }).map((_, i) => (
          <div
            key={i}
            className="
              h-32
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
          Failed to load logs
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
    <div className="space-y-8">
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
          Audit Logs
        </h1>

        <p
          className="
            mt-3
            text-slate-600
          "
        >
          Track platform activity
        </p>
      </div>

      {/* EMPTY */}

      {logs.length ===
        0 && (
        <div
          className="
            rounded-3xl
            bg-white/70
            p-8
            text-center
            md:p-12
          "
        >
          No logs found.
        </div>
      )}

      {/* LOGS */}

      <div className="space-y-5">
        {logs.map(
          (log) => (
            <div
              key={log.id}
              className="
                rounded-3xl
                bg-white/70
                p-5
                md:p-8
              "
            >
              <h2
                className="
                  break-words
                  text-lg
                  font-black
                  md:text-xl
                "
              >
                {log.action}
              </h2>

              <div
                className="
                  mt-4

                  flex
                  flex-col
                  gap-2

                  text-sm

                  text-slate-500

                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >
                <span>
                  {log.user
                    ?.name ??
                    "System"}
                </span>

                <span>
                  {new Date(
                    log.createdAt
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
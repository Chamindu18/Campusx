"use client";

/**
 * Notifications page.
 */

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

interface Notification {
  id: string;

  title: string;

  message: string;

  link?: string;

  createdAt: string;

  read: boolean;
}

export default function NotificationsPage() {
  const [
    notifications,
    setNotifications,
  ] =
    useState<
      Notification[]
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
          "/api/notifications"
        );

      if (
        !response.ok
      ) {
        throw new Error();
      }

      const data =
        await response.json();

      setNotifications(
        data
      );
    } catch {
      toast.error(
        "Failed to load notifications"
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  async function markRead(
    id: string
  ) {
    try {
      await fetch(
        `/api/notifications/${id}`,
        {
          method:
            "PATCH",
        }
      );

      setNotifications(
        (
          prev
        ) =>
          prev.map(
            (
              n
            ) =>
              n.id ===
              id
                ? {
                    ...n,

                    read:
                      true,
                  }
                : n
          )
      );
    } catch {
      toast.error(
        "Failed to update"
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
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-black">
          Notifications
        </h1>

        <p className="mt-3 text-slate-600">
          Activity updates
        </p>
      </div>

      {notifications.length ===
        0 && (
        <div className="rounded-3xl bg-white/70 p-12 text-center">
          No notifications
        </div>
      )}

      <div className="space-y-5">
        {notifications.map(
          (
            item
          ) => (
            <div
              key={
                item.id
              }
              className={`
                rounded-3xl
                p-8

                ${
                  item.read
                    ? "bg-white/60"
                    : "bg-blue-50"
                }
              `}
            >
              <h2 className="text-2xl font-black">
                {
                  item.title
                }
              </h2>

              <p className="mt-4 text-slate-600">
                {
                  item.message
                }
              </p>

              <div className="mt-8">
                {!item.read && (
                  <button
                    onClick={() =>
                      markRead(
                        item.id
                      )
                    }
                    className="
                      rounded-2xl
                      bg-slate-900
                      px-5
                      py-3
                      text-white
                    "
                  >
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
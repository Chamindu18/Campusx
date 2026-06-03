"use client";

/**
 * Notifications page.
 */

import Link from "next/link";

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

  const [
    error,
    setError,
  ] =
    useState(
      false
    );

  async function load() {
    try {
      setLoading(
        true
      );

      setError(
        false
      );

      const response =
        await fetch(
          "/api/notifications"
        );

      if (
        !response.ok
      ) {
        throw new Error(
          "Failed to load notifications"
        );
      }

      const data =
        await response.json();

      setNotifications(
        data
      );
    } catch (
      error
    ) {
      console.error(
        error
      );

      setError(
        true
      );

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
      const response =
        await fetch(
          `/api/notifications/${id}`,
          {
            method:
              "PATCH",
          }
        );

      if (
        !response.ok
      ) {
        throw new Error(
          "Failed to update notification"
        );
      }

      setNotifications(
        (
          previous
        ) =>
          previous.map(
            (
              notification
            ) =>
              notification.id ===
              id
                ? {
                    ...notification,
                    read:
                      true,
                  }
                : notification
          )
      );

      toast.success(
        "Notification marked as read"
      );
    } catch (
      error
    ) {
      console.error(
        error
      );

      toast.error(
        "Failed to update notification"
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
      <div
        className="
          flex
          h-[60vh]
          items-center
          justify-center
        "
      >
        Loading notifications...
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
          Notifications
        </h1>

        <p
          className="
            mt-3
            text-slate-600
          "
        >
          Activity updates
        </p>
      </div>

      {/* ERROR */}

      {error && (
        <div
          className="
            rounded-3xl

            border
            border-red-200

            bg-red-50

            p-6

            text-red-600
          "
        >
          Failed to load notifications.
        </div>
      )}

      {/* EMPTY */}

      {!error &&
        notifications.length ===
          0 && (
          <div
            className="
              rounded-3xl

              bg-white/70

              p-8
              md:p-12

              text-center
            "
          >
            <h2
              className="
                text-2xl
                font-bold
              "
            >
              No notifications
            </h2>

            <p className="mt-3 text-slate-500">
              You&apos;re all caught up.
            </p>
          </div>
        )}

      {/* LIST */}

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

                p-6
                md:p-8

                transition

                ${
                  item.read
                    ? `
                      bg-white/60
                    `
                    : `
                      border
                      border-blue-100

                      bg-blue-50
                    `
                }
              `}
            >
              <div
                className="
                  flex
                  flex-col

                  gap-4

                  md:flex-row
                  md:items-start
                  md:justify-between
                "
              >
                <div className="min-w-0 flex-1">
                  <h2
                    className="
                      break-words

                      text-xl
                      font-black

                      md:text-2xl
                    "
                  >
                    {
                      item.title
                    }
                  </h2>

                  <p
                    className="
                      mt-4

                      break-words

                      text-slate-600
                    "
                  >
                    {
                      item.message
                    }
                  </p>

                  <p
                    className="
                      mt-4

                      text-sm

                      text-slate-400
                    "
                  >
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                {!item.read && (
                  <span
                    className="
                      self-start

                      rounded-full

                      bg-blue-600

                      px-3
                      py-1

                      text-xs
                      font-semibold

                      text-white
                    "
                  >
                    New
                  </span>
                )}
              </div>

              <div
                className="
                  mt-6

                  flex
                  flex-wrap

                  gap-3
                "
              >
                {item.link && (
                  <Link
                    href={
                      item.link
                    }
                    className="
                      rounded-2xl

                      border

                      px-5
                      py-3

                      text-sm
                      font-medium

                      transition

                      hover:bg-slate-50
                    "
                  >
                    View
                  </Link>
                )}

                {!item.read && (
                  <button
                    type="button"
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

                      text-sm
                      font-medium

                      text-white

                      transition

                      hover:bg-slate-800
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
"use client";

/**
 * Notification dropdown component.
 */

import Link from "next/link";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Bell,
  CheckCheck,
} from "lucide-react";

import toast from "react-hot-toast";

import { useNotifications } from "@/hooks/use-notifications";

export function NotificationBell() {
  const [isOpen, setIsOpen] =
    useState(false);

  const dropdownRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const {
    notifications,
    unreadCount,
    mutate,
  } = useNotifications();

  /**
   * Mark notification as read.
   */
  async function handleRead(
    id: string
  ) {
    try {
      const response =
        await fetch(
          `/api/notifications/${id}`,
          {
            method: "PATCH",
          }
        );

      if (!response.ok) {
        throw new Error();
      }

      await mutate();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update notification"
      );
    }
  }

  /**
   * Mark all as read.
   */
  async function markAllAsRead() {
    try {
      const response =
        await fetch(
          "/api/notifications/read-all",
          {
            method: "PATCH",
          }
        );

      if (!response.ok) {
        throw new Error();
      }

      await mutate();

      toast.success(
        "Notifications updated"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update notifications"
      );
    }
  }

  /**
   * Close when clicking outside.
   */
  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /**
   * Close with Escape key.
   */
  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (
        event.key === "Escape"
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  const dropdownId =
    "notification-dropdown";

  function formatUnreadCount(
    count: number
  ) {
    return count > 99
      ? "99+"
      : String(count);
  }

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      {/* BUTTON */}
      <button
        type="button"
        aria-label="Toggle notifications"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
        onClick={() =>
          setIsOpen(
            (previous) => !previous
          )
        }
        className="
          relative
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-white/70
          text-slate-700
          backdrop-blur-xl
          transition
          hover:bg-white
        "
      >
        <Bell className="h-5 w-5" />

        {unreadCount > 0 && (
          <div
            className="
              absolute
              -right-1
              -top-1
              flex
              h-6
              min-w-[24px]
              items-center
              justify-center
              rounded-full
              bg-red-500
              px-1
              text-xs
              font-bold
              text-white
            "
          >
            {formatUnreadCount(
              unreadCount
            )}
          </div>
        )}
      </button>

      {/* DROPDOWN */}
      <div
        id={dropdownId}
        className={`
          absolute
          left-1/2
          top-16
          z-50

          w-[95vw]
          max-w-md

          -translate-x-1/2

          rounded-3xl
          border
          border-white/40

          bg-white/90

          shadow-2xl
          shadow-slate-200/30

          backdrop-blur-2xl

          transition-all
          duration-200

          ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible translate-y-3 opacity-0"
          }

          md:left-auto
          md:right-0
          md:translate-x-0
        `}
      >
        {/* HEADER */}
        <div
          className="
            flex
            items-center
            justify-between

            border-b
            border-slate-200

            px-6
            py-5
          "
        >
          <div>
            <h3
              className="
                text-lg
                font-bold
                text-slate-900
              "
            >
              Notifications
            </h3>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Recent platform activity
            </p>
          </div>

          <button
            type="button"
            aria-label="Mark all notifications as read"
            disabled={
              notifications.length ===
              0
            }
            onClick={
              markAllAsRead
            }
            className="
              flex
              min-h-[44px]
              items-center
              gap-2

              rounded-xl

              bg-slate-100

              px-3
              py-2

              text-xs
              font-semibold

              text-slate-600

              transition

              hover:bg-slate-200

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <CheckCheck className="h-4 w-4" />
            Mark all
          </button>
        </div>

        {/* CONTENT */}
        <div className="max-h-[450px] overflow-y-auto">
          {notifications.length ===
            0 && (
            <div className="px-6 py-20 text-center">
              <p className="text-sm text-slate-500">
                No notifications yet
              </p>
            </div>
          )}

          {notifications.map(
            (notification) =>
              notification.link ? (
                <Link
                  key={
                    notification.id
                  }
                  href={
                    notification.link
                  }
                  aria-label={`Open ${notification.title}`}
                  onClick={() => {
                    handleRead(
                      notification.id
                    );

                    setIsOpen(
                      false
                    );
                  }}
                  className={`
                    block
                    min-h-[44px]
                    w-full

                    border-b
                    border-slate-100

                    px-6
                    py-5

                    text-left

                    transition

                    hover:bg-slate-50

                    ${
                      !notification.read
                        ? "bg-blue-50/60"
                        : ""
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">
                        {
                          notification.title
                        }
                      </h4>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {
                          notification.message
                        }
                      </p>
                    </div>

                    {!notification.read && (
                      <div
                        className="
                          mt-2
                          h-3
                          w-3
                          rounded-full
                          bg-blue-500
                        "
                      />
                    )}
                  </div>
                </Link>
              ) : (
                <button
                  key={
                    notification.id
                  }
                  type="button"
                  aria-label={`Mark ${notification.title} as read`}
                  onClick={() =>
                    handleRead(
                      notification.id
                    )
                  }
                  className={`
                    block
                    min-h-[44px]
                    w-full

                    border-b
                    border-slate-100

                    px-6
                    py-5

                    text-left

                    transition

                    hover:bg-slate-50

                    ${
                      !notification.read
                        ? "bg-blue-50/60"
                        : ""
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">
                        {
                          notification.title
                        }
                      </h4>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {
                          notification.message
                        }
                      </p>
                    </div>

                    {!notification.read && (
                      <div
                        className="
                          mt-2
                          h-3
                          w-3
                          rounded-full
                          bg-blue-500
                        "
                      />
                    )}
                  </div>
                </button>
              )
          )}
        </div>
      </div>
    </div>
  );
}
/**
 * Notifications hook.
 */

"use client";

import useSWR from "swr";

/* ===================================================== */
/* TYPES */
/* ===================================================== */

interface Notification {
  id: string;

  title: string;

  message: string;

  isRead: boolean;

  createdAt: string;
}

/* ===================================================== */
/* FETCHER */
/* ===================================================== */

const fetcher = async (
  url: string
): Promise<
  Notification[]
> => {
  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch notifications"
    );
  }

  return response.json();
};

/* ===================================================== */
/* HOOK */
/* ===================================================== */

export function useNotifications() {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR<
    Notification[]
  >(
    "/api/notifications",
    fetcher,
    {
      refreshInterval:
        5000,
    }
  );

  return {
    notifications:
      data ?? [],

    unreadCount:
      data?.filter(
        (
          notification
        ) =>
          !notification.isRead
      ).length ?? 0,

    error,

    isLoading,

    mutate,
  };
}
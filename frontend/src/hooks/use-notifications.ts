/**
 * Notifications hook.
 */

"use client";

import useSWR from "swr";

/* ===================================================== */
/* TYPES */
/* ===================================================== */

export interface Notification {
  id: string;

  title: string;

  message: string;

  read: boolean;

  link?: string | null;

  createdAt: string;
}

/* ===================================================== */
/* FETCHER */
/* ===================================================== */

const fetcher = async (
  url: string
): Promise<Notification[]> => {
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
      revalidateOnFocus:
        true,
    }
  );

  const notifications =
    data ?? [];

  const unreadCount =
    notifications.filter(
      (
        notification
      ) =>
        !notification.read
    ).length;

  return {
    notifications,

    unreadCount,

    error,

    isLoading,

    mutate,
  };
}
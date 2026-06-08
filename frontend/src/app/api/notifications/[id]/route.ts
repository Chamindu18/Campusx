/**
 * Single notification API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/* ===================================================== */
/* MARK AS READ */
/* ===================================================== */

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const currentUser =
      await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const resolvedParams =
      await params;

    const existingNotification =
      await prisma.notification.findUnique(
        {
          where: {
            id: resolvedParams.id,
          },
        }
      );

    if (
      !existingNotification
    ) {
      return NextResponse.json(
        {
          error:
            "Notification not found",
        },
        {
          status: 404,
        }
      );
    }

    if (
      existingNotification.userId !==
      currentUser.id
    ) {
      return NextResponse.json(
        {
          error:
            "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    const notification =
      await prisma.notification.update(
        {
          where: {
            id: resolvedParams.id,
          },

          data: {
            isRead: true,
          },
        }
      );

    return NextResponse.json(
      notification
    );
  } catch (
    error
  ) {
    console.error(
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to update notification",
      },
      {
        status: 500,
      }
    );
  }
}
/**
 * Notification actions.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/* ===================================================== */
/* MARK READ */
/* ===================================================== */

export async function PATCH(
  request: Request,
  { params }: RouteParams
) {
  try {
    const currentUser =
      await getCurrentUser();

    if (
      !currentUser
    ) {
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

    const {
      id,
    } =
      await params;

    const notification =
      await prisma.notification.findUnique(
        {
          where: {
            id,
          },
        }
      );

    if (
      !notification
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
      notification.userId !==
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

    const updated =
      await prisma.notification.update(
        {
          where: {
            id,
          },

          data: {
            read:
              true,
          },
        }
      );

    return NextResponse.json(
      updated
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

/* ===================================================== */
/* DELETE */
/* ===================================================== */

export async function DELETE(
  request: Request,
  { params }: RouteParams
) {
  try {
    const currentUser =
      await getCurrentUser();

    if (
      !currentUser
    ) {
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

    const {
      id,
    } =
      await params;

    const notification =
      await prisma.notification.findUnique(
        {
          where: {
            id,
          },
        }
      );

    if (
      !notification
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
      notification.userId !==
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

    await prisma.notification.delete(
      {
        where: {
          id,
        },
      }
    );

    return NextResponse.json({
      success:
        true,
    });
  } catch (
    error
  ) {
    console.error(
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to delete notification",
      },
      {
        status: 500,
      }
    );
  }
}
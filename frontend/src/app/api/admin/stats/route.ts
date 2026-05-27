/**
 * Admin dashboard statistics.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/* ===================================================== */
/* GET ADMIN STATS */
/* ===================================================== */

export async function GET() {
  try {
    /**
     * Current user.
     */
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

    /**
     * Admin only.
     */
    if (
      currentUser.role !==
      "ADMIN"
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

    /**
     * Aggregate.
     */
    const [
      users,

      listings,

      dorms,

      reports,

      pendingReports,

      notifications,
    ] =
      await Promise.all(
        [
          prisma.user.count(),

          prisma.listing.count(),

          prisma.dorm.count(),

          prisma.report.count(),

          prisma.report.count(
            {
              where: {
                status:
                  "PENDING",
              },
            }
          ),

          prisma.notification.count(),
        ]
      );

    return NextResponse.json(
      {
        users,

        listings,

        dorms,

        reports,

        pendingReports,

        notifications,
      }
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
          "Failed to load admin stats",
      },
      {
        status: 500,
      }
    );
  }
}
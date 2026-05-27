/**
 * Admin audit logs.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/* ===================================================== */
/* GET LOGS */
/* ===================================================== */

export async function GET() {
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
     * Temporary logs generated
     * from existing entities.
     */

    const [
      listings,

      dorms,

      reports,
    ] =
      await Promise.all([
        prisma.listing.findMany({
          take: 20,

          orderBy: {
            createdAt:
              "desc",
          },

          include: {
            user: {
              select: {
                name:
                  true,
              },
            },
          },
        }),

        prisma.dorm.findMany({
          take: 20,

          orderBy: {
            createdAt:
              "desc",
          },

          include: {
            user: {
              select: {
                name:
                  true,
              },
            },
          },
        }),

        prisma.report.findMany({
          take: 20,

          orderBy: {
            createdAt:
              "desc",
            },

          include: {
            reporter: {
              select: {
                name:
                  true,
              },
            },
          },
        }),
      ]);

    const logs = [
      ...listings.map(
        (
          item
        ) => ({
          id:
            `listing-${item.id}`,

          action:
            `Created listing: ${item.title}`,

          createdAt:
            item.createdAt,

          user:
            item.user,
        })
      ),

      ...dorms.map(
        (
          item
        ) => ({
          id:
            `dorm-${item.id}`,

          action:
            `Created dorm: ${item.title}`,

          createdAt:
            item.createdAt,

          user:
            item.user,
        })
      ),

      ...reports.map(
        (
          item
        ) => ({
          id:
            `report-${item.id}`,

          action:
            `Report submitted`,

          createdAt:
            item.createdAt,

          user:
            item.reporter,
        })
      ),
    ]
      .sort(
        (
          a,
          b
        ) =>
          new Date(
            b.createdAt
          ).getTime() -
          new Date(
            a.createdAt
          ).getTime()
      )
      .slice(
        0,
        50
      );

    return NextResponse.json(
      logs
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
          "Failed to load logs",
      },
      {
        status: 500,
      }
    );
  }
}
/**
 * Reports API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/* ===================================================== */
/* CREATE REPORT */
/* ===================================================== */

export async function POST(
  request: Request
) {
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
     * Parse body.
     */
    const body =
      await request.json();

    const listingId =
      body.listingId?.trim();

    const reason =
      body.reason?.trim();

    const description =
      body.description?.trim() ||
      "";

    /**
     * Validation.
     */
    if (
      !listingId ||
      !reason
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Ensure listing exists.
     */
    const targetListing =
      await prisma.listing.findUnique({
        where: {
          id:
            listingId,
        },

        select: {
          id: true,

          title:
            true,

          userId:
            true,
        },
      });

    if (!targetListing) {
      return NextResponse.json(
        {
          error:
            "Listing not found",
        },
        {
          status: 404,
        }
      );
    }

    /**
     * Prevent self-reporting.
     */
    if (
      targetListing.userId ===
      currentUser.id
    ) {
      return NextResponse.json(
        {
          error:
            "You cannot report your own listing",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Prevent duplicate reports.
     */
    const existingReport =
      await prisma.report.findFirst({
        where: {
          listingId,

          reporterId:
            currentUser.id,
        },
      });

    if (
      existingReport
    ) {
      return NextResponse.json(
        {
          error:
            "You already reported this listing",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Create report.
     */
    const report =
      await prisma.report.create({
        data: {
          listingId,

          reason,

          description,

          reporterId:
            currentUser.id,
        },
      });

    /**
     * Notify owner.
     */
    try {
      await prisma.notification.create({
        data: {
          title:
            `Listing reported: ${targetListing.title}`,

          message:
            `Your listing was reported for: ${reason}`,

          link:
            `/marketplace/${targetListing.id}`,

          userId:
            targetListing.userId,
        },
      });
    } catch (
      error
    ) {
      console.error(
        "Notification error:",
        error
      );
    }

    return NextResponse.json(
      report
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
          "Failed to create report",
      },
      {
        status: 500,
      }
    );
  }
}

/* ===================================================== */
/* GET REPORTS */
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
     * Fetch reports.
     */
    const reports =
      await prisma.report.findMany({
        include: {
          reporter: {
            select: {
              id: true,

              name:
                true,

              email:
                true,
            },
          },

          listing:
            true,
        },

        orderBy: {
          createdAt:
            "desc",
        },
      });

    return NextResponse.json(
      reports
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
          "Failed to fetch reports",
      },
      {
        status: 500,
      }
    );
  }
}
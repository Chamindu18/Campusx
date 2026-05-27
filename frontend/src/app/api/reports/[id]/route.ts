import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/* ===================================================== */
/* RESOLVE REPORT */
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

    const {
      id,
    } =
      await params;

    /**
     * Verify report.
     */
    const existing =
      await prisma.report.findUnique({
        where: {
          id,
        },
      });

    if (
      !existing
    ) {
      return NextResponse.json(
        {
          error:
            "Report not found",
        },
        {
          status: 404,
        }
      );
    }

    /**
     * Resolve.
     */
    const report =
      await prisma.report.update({
        where: {
          id,
        },

        data: {
          status:
            "RESOLVED",
        },
      });

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
          "Failed to resolve report",
      },
      {
        status: 500,
      }
    );
  }
}

/* ===================================================== */
/* REMOVE REPORTED LISTING */
/* ===================================================== */

export async function DELETE(
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

    const {
      id,
    } =
      await params;

    /**
     * Find report.
     */
    const report =
      await prisma.report.findUnique({
        include: {
          listing:
            true,
        },

        where: {
          id,
        },
      });

    if (
      !report
    ) {
      return NextResponse.json(
        {
          error:
            "Report not found",
        },
        {
          status: 404,
        }
      );
    }

    /**
     * Notify owner.
     */
    try {
      await prisma.notification.create({
        data: {
          userId:
            report.listing
              .userId,

          title:
            "Listing removed",

          message:
            "Your listing was removed after moderation review.",

          link:
            "/dashboard",
        },
      });
    } catch (
      error
    ) {
      console.error(
        error
      );
    }

    /**
     * Cleanup.
     */
    await prisma.savedListing.deleteMany({
      where: {
        listingId:
          report.listingId,
      },
    });

    await prisma.report.deleteMany({
      where: {
        listingId:
          report.listingId,
      },
    });

    await prisma.listing.delete({
      where: {
        id:
          report.listingId,
      },
    });

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
          "Failed to remove listing",
      },
      {
        status: 500,
      }
    );
  }
}
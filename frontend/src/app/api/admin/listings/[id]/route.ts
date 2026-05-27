/**
 * Admin remove listing.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/* ===================================================== */
/* DELETE */
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

    const listing =
      await prisma.listing.findUnique({
        where: {
          id,
        },
      });

    if (
      !listing
    ) {
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

    await prisma.savedListing.deleteMany(
      {
        where: {
          listingId:
            id,
        },
      }
    );

    await prisma.report.deleteMany(
      {
        where: {
          listingId:
            id,
        },
      }
    );

    await prisma.listing.delete(
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
          "Failed to delete listing",
      },
      {
        status: 500,
      }
    );
  }
}
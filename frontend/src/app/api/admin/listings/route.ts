/**
 * Admin listings API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/* ===================================================== */
/* GET ALL LISTINGS */
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

    const listings =
      await prisma.listing.findMany({
        select: {
          id: true,

          title:
            true,

          price:
            true,

          category:
            true,

          createdAt:
            true,

          user: {
            select: {
              id:
                true,

              name:
                true,
            },
          },
        },

        orderBy: {
          createdAt:
            "desc",
        },
      });

    return NextResponse.json(
      listings
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
          "Failed to fetch listings",
      },
      {
        status: 500,
      }
    );
  }
}
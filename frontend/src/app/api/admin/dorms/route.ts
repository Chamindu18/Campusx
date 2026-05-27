/**
 * Admin dorm moderation API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/* ===================================================== */
/* GET DORMS */
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

    const dorms =
      await prisma.dorm.findMany({
        select: {
          id: true,

          title:
            true,

          university:
            true,

          city:
            true,

          price:
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
      dorms
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
          "Failed to fetch dorms",
      },
      {
        status: 500,
      }
    );
  }
}
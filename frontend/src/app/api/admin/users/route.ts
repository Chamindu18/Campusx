/**
 * Admin users API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/* ===================================================== */
/* GET USERS */
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
     * Fetch users.
     */
    const users =
      await prisma.user.findMany({
        select: {
          id: true,

          name: true,

          email: true,

          role: true,

          university:
            true,

          createdAt:
            true,

          _count: {
            select: {
              listings:
                true,

              dorms:
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
      users
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
          "Failed to fetch users",
      },
      {
        status: 500,
      }
    );
  }
}
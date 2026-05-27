/**
 * Public user profile API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    /**
     * Route params.
     */
    const {
      id,
    } =
      await params;

    /**
     * Find public user.
     */
    const user =
      await prisma.user.findUnique({
        where: {
          id,
        },

        select: {
          id: true,

          name:
            true,

          university:
            true,

          bio:
            true,

          createdAt:
            true,

          listings: {
            select: {
              id:
                true,

              title:
                true,

              price:
                true,

              imageUrls:
                true,

              createdAt:
                true,
            },

            orderBy: {
              createdAt:
                "desc",
            },

            take: 6,
          },

          dorms: {
            select: {
              id:
                true,

              title:
                true,

              imageUrls:
                true,

              createdAt:
                true,
            },

            orderBy: {
              createdAt:
                "desc",
            },

            take: 6,
          },

          _count: {
            select: {
              listings:
                true,

              dorms:
                true,
            },
          },
        },
      });

    /**
     * Missing user.
     */
    if (!user) {
      return NextResponse.json(
        {
          error:
            "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      user
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
          "Failed to fetch user",
      },
      {
        status: 500,
      }
    );
  }
}
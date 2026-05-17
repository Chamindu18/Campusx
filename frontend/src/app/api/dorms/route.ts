/**
 * Dorm listings API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

import {
  dormSchema,
} from "@/lib/validations/dorm";

/* ===================================================== */
/* CREATE DORM */
/* ===================================================== */

export async function POST(
  request: Request
) {
  try {
    /**
     * Authenticated user.
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
     * Request body.
     */
    const body =
      await request.json();

    /**
     * Validate body.
     */
    const parsed =
      dormSchema.safeParse(
        body
      );

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]
              ?.message ||
            "Invalid dorm data",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Create dorm.
     */
    const dorm =
      await prisma.dorm.create({
        data: {
          ...parsed.data,

          userId:
            currentUser.id,
        },
      });

    return NextResponse.json(
      dorm
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create dorm",
      },
      {
        status: 500,
      }
    );
  }
}

/* ===================================================== */
/* GET DORMS */
/* ===================================================== */

export async function GET(
  request: Request
) {
  try {
    const {
      searchParams,
    } = new URL(
      request.url
    );

    /**
     * Filters.
     */
    const search =
      searchParams.get(
        "search"
      );

    const university =
      searchParams.get(
        "university"
      );

    const city =
      searchParams.get(
        "city"
      );

    const gender =
      searchParams.get(
        "gender"
      );

    const roomType =
      searchParams.get(
        "roomType"
      );

    const maxPrice =
      searchParams.get(
        "maxPrice"
      );

    const sort =
      searchParams.get(
        "sort"
      );

    /**
     * Query dorms.
     */
    const dorms =
      await prisma.dorm.findMany(
        {
          where: {
            ...(search && {
              OR: [
                {
                  title: {
                    contains:
                      search,

                    mode:
                      "insensitive",
                  },
                },

                {
                  description:
                    {
                      contains:
                        search,

                      mode:
                        "insensitive",
                    },
                },
              ],
            }),

            ...(university &&
              university !==
                "All" && {
                university,
              }),

            ...(city && {
              city: {
                contains:
                  city,

                mode:
                  "insensitive",
              },
            }),

            ...(gender && {
              gender,
            }),

            ...(roomType && {
              roomType,
            }),

            ...(maxPrice && {
              price: {
                lte: Number(
                  maxPrice
                ),
              },
            }),
          },

          include: {
            user: {
              select: {
                id: true,

                name: true,

                university: true,
              },
            },
          },

          orderBy:
            sort ===
            "price-low"
              ? {
                  price:
                    "asc",
                }
              : sort ===
                "price-high"
              ? {
                  price:
                    "desc",
                }
              : {
                  createdAt:
                    "desc",
                },
        }
      );

    return NextResponse.json({
      dorms,
    });
  } catch (error) {
    console.error(error);

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
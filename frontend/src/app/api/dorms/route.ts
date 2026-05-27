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
     * Parse request.
     */
    const body =
      await request.json();

    const parsed =
      dormSchema.safeParse(
        body
      );

    if (
      !parsed.success
    ) {
      return NextResponse.json(
        {
          error:
            parsed.error
              .issues[0]
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
  } catch (
    error
  ) {
    console.error(
      error
    );

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

    const search =
      searchParams
        .get(
          "search"
        )
        ?.trim();

    const university =
      searchParams
        .get(
          "university"
        )
        ?.trim();

    const city =
      searchParams
        .get(
          "city"
        )
        ?.trim();

    const gender =
      searchParams
        .get(
          "gender"
        )
        ?.trim();

    const roomType =
      searchParams
        .get(
          "roomType"
        )
        ?.trim();

    const maxPrice =
      searchParams
        .get(
          "maxPrice"
        );

    const sort =
      searchParams
        .get(
          "sort"
        );

    /**
     * Query.
     */
    const where: Record<
      string,
      unknown
    > = {};

    if (
      search
    ) {
      where.OR = [
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
      ];
    }

    if (
      university &&
      university !==
        "All"
    ) {
      where.university =
        university;
    }

    if (
      city
    ) {
      where.city =
        {
          contains:
            city,

          mode:
            "insensitive",
        };
    }

    if (
      gender
    ) {
      where.gender =
        gender;
    }

    if (
      roomType
    ) {
      where.roomType =
        roomType;
    }

    if (
      maxPrice
    ) {
      where.price =
        {
          lte:
            Number(
              maxPrice
            ),
        };
    }

    const dorms =
      await prisma.dorm.findMany(
        {
          where,

          include:
            {
              user:
                {
                  select:
                    {
                      id:
                        true,

                      name:
                        true,

                      university:
                        true,
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

    return NextResponse.json(
      {
        dorms,
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
          "Failed to fetch dorms",
      },
      {
        status: 500,
      }
    );
  }
}
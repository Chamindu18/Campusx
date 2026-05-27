/**
 * Marketplace listings API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

import {
  listingSchema,
} from "@/lib/validations/listing";

/* ===================================================== */
/* GET LISTINGS */
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
        ?.trim() ||
      "";

    const category =
      searchParams
        .get(
          "category"
        )
        ?.trim() ||
      "";

    const page =
      Math.max(
        1,
        Number(
          searchParams.get(
            "page"
          ) || "1"
        )
      );

    const limit = 9;

    const skip =
      (page - 1) *
      limit;

    const where: Record<
      string,
      unknown
    > = {};

    /**
     * Search.
     */
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

    /**
     * Category.
     */
    if (
      category &&
      category !==
        "All"
    ) {
      where.category =
        category;
    }

    const [
      listings,
      totalListings,
    ] =
      await Promise.all(
        [
          prisma.listing.findMany(
            {
              where,

              include:
                {
                  user:
                    {
                      select:
                        {
                          id: true,

                          name:
                            true,
                        },
                    },
                },

              orderBy:
                {
                  createdAt:
                    "desc",
                },

              skip,

              take:
                limit,
            }
          ),

          prisma.listing.count(
            {
              where,
            }
          ),
        ]
      );

    return NextResponse.json(
      {
        listings,

        pagination:
          {
            page,

            limit,

            totalListings,

            totalPages:
              Math.ceil(
                totalListings /
                  limit
              ),
          },
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
          "Failed to fetch listings",
      },
      {
        status: 500,
      }
    );
  }
}

/* ===================================================== */
/* CREATE LISTING */
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

    if (
      !currentUser
    ) {
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

    const parsed =
      listingSchema.safeParse(
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
              ?.message,
        },
        {
          status: 400,
        }
      );
    }

    const {
      imageUrls =
        [],
    } =
      parsed.data;

    /**
     * Require images.
     */
    if (
      imageUrls.length ===
      0
    ) {
      return NextResponse.json(
        {
          error:
            "Upload at least one image",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Create listing.
     */
    const listing =
      await prisma.listing.create(
        {
          data: {
            ...parsed.data,

            userId:
              currentUser.id,
          },
        }
      );

    return NextResponse.json(
      listing
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
          "Failed to create listing",
      },
      {
        status: 500,
      }
    );
  }
}
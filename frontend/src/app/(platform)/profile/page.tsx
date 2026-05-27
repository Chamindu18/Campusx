/**
 * User profile API.
 */

import { NextResponse } from "next/server";

import { z } from "zod";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/* ===================================================== */
/* VALIDATION */
/* ===================================================== */

const profileUpdateSchema =
  z.object({
    name:
      z
        .string()
        .trim()
        .min(
          2,
          "Name must be at least 2 characters"
        )
        .optional(),

    university:
      z
        .string()
        .trim()
        .optional(),

    bio:
      z
        .string()
        .trim()
        .max(
          500,
          "Bio must be less than 500 characters"
        )
        .optional(),
  });

/* ===================================================== */
/* SAFE USER SELECT */
/* ===================================================== */

const userSelect = {
  id: true,

  name: true,

  email: true,

  university:
    true,

  bio:
    true,

  createdAt:
    true,
};

/* ===================================================== */
/* GET PROFILE */
/* ===================================================== */

export async function GET() {
  try {
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

    const user =
      await prisma.user.findUnique({
        where: {
          id:
            currentUser.id,
        },

        select:
          userSelect,
      });

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
          "Failed to fetch profile",
      },
      {
        status: 500,
      }
    );
  }
}

/* ===================================================== */
/* UPDATE PROFILE */
/* ===================================================== */

export async function PATCH(
  request: Request
) {
  try {
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

    const body =
      await request.json();

    const parsed =
      profileUpdateSchema.safeParse(
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
      name,
      university,
      bio,
    } =
      parsed.data;

    await prisma.user.update({
      where: {
        id:
          currentUser.id,
      },

      data: {
        ...(name !==
          undefined && {
          name,
        }),

        ...(university !==
          undefined && {
          university,
        }),

        ...(bio !==
          undefined && {
          bio,
        }),
      },
    });

    const updated =
      await prisma.user.findUnique({
        where: {
          id:
            currentUser.id,
        },

        select:
          userSelect,
      });

    return NextResponse.json(
      updated
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
          "Failed to update profile",
      },
      {
        status: 500,
      }
    );
  }
}
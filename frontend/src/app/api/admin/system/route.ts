/**
 * System monitor.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

export async function GET() {
  try {
    const user =
      await getCurrentUser();

    if (
      !user
    ) {
      return NextResponse.json(
        {},
        {
          status: 401,
        }
      );
    }

    if (
      user.role !==
      "ADMIN"
    ) {
      return NextResponse.json(
        {},
        {
          status: 403,
        }
      );
    }

    const [
      users,

      listings,

      dorms,

      reports,

      notifications,
    ] =
      await Promise.all([
        prisma.user.count(),

        prisma.listing.count(),

        prisma.dorm.count(),

        prisma.report.count(),

        prisma.notification.count(),
      ]);

    return NextResponse.json(
      {
        users,

        listings,

        dorms,

        reports,

        notifications,

        server:
          "Healthy",
      }
    );
  } catch {
    return NextResponse.json(
      {
        server:
          "Error",
      },
      {
        status: 500,
      }
    );
  }
}
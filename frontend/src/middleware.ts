/**
 * Route protection middleware.
 *
 * Responsibilities:
 * - Protect authenticated routes
 * - Enforce admin-only access
 * - Validate JWT tokens
 * - Redirect invalid sessions
 */

import {
  NextResponse,
} from "next/server";

import type {
  NextRequest,
} from "next/server";

import {
  AUTH_COOKIE_NAME,
} from "@/lib/auth-shared";

import {
  verifyEdgeToken,
} from "@/lib/auth-edge";

/* ===================================================== */
/* ROUTES */
/* ===================================================== */

/**
 * ONLY protected routes.
 *
 * Marketplace + dorm browsing
 * are now PUBLIC.
 */
const protectedRoutes = [
  "/dashboard",

  "/messages",

  "/profile",

  "/create-listing",

  "/create-dorm",

  "/saved",

  "/settings",

  "/notifications",

  "/admin",
];

/* ===================================================== */
/* HELPERS */
/* ===================================================== */

/**
 * Protected route check.
 */
function isProtectedPath(
  pathname: string
) {
  return protectedRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(
        `${route}/`
      )
  );
}

/**
 * Build login redirect.
 */
function buildLoginRedirect(
  request: NextRequest
) {
  const loginUrl =
    new URL(
      "/login",
      request.url
    );

  loginUrl.searchParams.set(
    "next",
    `${request.nextUrl.pathname}${request.nextUrl.search}`
  );

  return NextResponse.redirect(
    loginUrl
  );
}

/* ===================================================== */
/* MIDDLEWARE */
/* ===================================================== */

export async function middleware(
  request: NextRequest
) {
  const pathname =
    request.nextUrl.pathname;

  /**
   * Public route.
   */
  if (
    !isProtectedPath(
      pathname
    )
  ) {
    return NextResponse.next();
  }

  /**
   * Auth token.
   */
  const token =
    request.cookies.get(
      AUTH_COOKIE_NAME
    )?.value;

  /**
   * Missing token.
   */
  if (!token) {
    return buildLoginRedirect(
      request
    );
  }

  /**
   * Verify token.
   */
  const payload =
    await verifyEdgeToken(
      token
    );

  /**
   * Invalid/expired token.
   */
  if (!payload) {
    const response =
      buildLoginRedirect(
        request
      );

    response.cookies.delete(
      AUTH_COOKIE_NAME
    );

    return response;
  }

  /**
   * Admin-only access.
   */
  if (
    pathname.startsWith(
      "/admin"
    ) &&
    payload.role !==
      "ADMIN"
  ) {
    return NextResponse.redirect(
      new URL(
        "/dashboard",
        request.url
      )
    );
  }

  return NextResponse.next();
}

/* ===================================================== */
/* MATCHER */
/* ===================================================== */

export const config = {
  matcher: [
    "/dashboard/:path*",

    "/messages/:path*",

    "/profile/:path*",

    "/create-listing/:path*",

    "/create-dorm/:path*",

    "/saved/:path*",

    "/settings/:path*",

    "/notifications/:path*",

    "/admin/:path*",
  ],
};
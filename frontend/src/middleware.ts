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

const authRoutes = [
  "/login",

  "/register",
];

/* ===================================================== */
/* HELPERS */
/* ===================================================== */

function isProtectedPath(
  pathname: string
) {
  return protectedRoutes.some(
    (
      route
    ) =>
      pathname ===
        route ||
      pathname.startsWith(
        `${route}/`
      )
  );
}

function isAuthPath(
  pathname: string
) {
  return authRoutes.some(
    (
      route
    ) =>
      pathname ===
      route
  );
}

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
    ) &&
    !isAuthPath(
      pathname
    )
  ) {
    return NextResponse.next();
  }

  /**
   * Read token.
   */
  const token =
    request.cookies.get(
      AUTH_COOKIE_NAME
    )?.value;

  /**
   * Auth pages.
   */
  if (
    isAuthPath(
      pathname
    )
  ) {
    if (!token) {
      return NextResponse.next();
    }

    const payload =
      await verifyEdgeToken(
        token
      );

    if (
      payload
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
   * Invalid token.
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
   * Admin only.
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
    "/login",

    "/register",

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
export type UserRole =
  | "USER"
  | "ADMIN";

export const AUTH_COOKIE_NAME = "campusx_token";

export const AUTH_COOKIE_MAX_AGE_SECONDS =
  60 * 60 * 24 * 7;

export function getLandingPathForRole(
  role?: UserRole | null
) {
  return role === "ADMIN"
    ? "/admin"
    : "/dashboard";
}

export function getSafeRedirectPath(
  path: string | null | undefined,
  fallback: string
) {
  if (!path) {
    return fallback;
  }

  if (!path.startsWith("/") || path.startsWith("//")) {
    return fallback;
  }

  return path;
}
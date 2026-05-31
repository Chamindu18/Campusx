"use client";

/**
 * Admin UI wrapper.
 *
 * Route protection is enforced
 * by middleware and server-side checks.
 *
 * This component exists purely as a
 * future extension point for:
 *
 * - client-side permission checks
 * - admin analytics
 * - feature flags
 * - admin onboarding flows
 */

import type {
  ReactNode,
} from "react";

interface AdminGuardProps {
  children: ReactNode;
}

export function AdminGuard({
  children,
}: AdminGuardProps) {
  return <>{children}</>;
}
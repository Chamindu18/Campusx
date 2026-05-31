/**
 * Authentication layout.
 *
 * Redirects authenticated users
 * away from login/signup pages.
 */

import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { AuthLayoutShell } from "@/components/layout/AuthLayoutShell";

import { getCurrentUser } from "@/lib/current-user";
import { getLandingPathForRole } from "@/lib/auth";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const currentUser =
    await getCurrentUser();

  if (currentUser) {
    redirect(
      getLandingPathForRole(
        currentUser.role
      )
    );
  }

  return (
    <AuthLayoutShell>
      {children}
    </AuthLayoutShell>
  );
}
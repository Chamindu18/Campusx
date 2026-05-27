"use client";

/**
 * Protect admin pages.
 */

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

export function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router =
    useRouter();

  const [
    loading,
    setLoading,
  ] =
    useState(
      true
    );

  const [
    allowed,
    setAllowed,
  ] =
    useState(
      false
    );

  useEffect(() => {
    async function verify() {
      try {
        const response =
          await fetch(
            "/api/me"
          );

        if (
          !response.ok
        ) {
          router.replace(
            "/login"
          );

          return;
        }

        const user =
          await response.json();

        if (
          user.role !==
          "ADMIN"
        ) {
          router.replace(
            "/dashboard"
          );

          return;
        }

        setAllowed(
          true
        );
      } catch {
        router.replace(
          "/dashboard"
        );
      } finally {
        setLoading(
          false
        );
      }
    }

    verify();
  }, [router]);

  if (
    loading
  ) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (
    !allowed
  ) {
    return null;
  }

  return (
    <>
      {children}
    </>
  );
}
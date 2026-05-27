"use client";

/**
 * Admin UI wrapper.
 *
 * Route protection is handled
 * by middleware + server.
 */

import type {
  ReactNode,
} from "react";

export function AdminGuard({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
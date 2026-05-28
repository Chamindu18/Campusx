/**
 * Reusable Card Component
 *
 * Used throughout:
 * - listings
 * - dashboard
 * - categories
 * - forms
 */

import type {
  HTMLAttributes,
} from "react";

import {
  cn,
} from "@/lib/utils";

/* ===================================================== */
/* TYPES */
/* ===================================================== */

type CardProps =
  HTMLAttributes<HTMLDivElement>;

/* ===================================================== */
/* COMPONENT */
/* ===================================================== */

export function Card({
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        /**
         * Modern subtle card styling.
         */
        "rounded-3xl border border-slate-200 bg-white shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
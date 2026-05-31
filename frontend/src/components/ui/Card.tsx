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
        `
          rounded-2xl

          border
          border-slate-100

          bg-white

          shadow-sm

          transition-all
          duration-200
        `,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
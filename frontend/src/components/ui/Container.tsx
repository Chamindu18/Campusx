/**
 * Global layout container.
 *
 * Keeps content:
 * - centered
 * - constrained
 * - responsive
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

type ContainerProps =
  HTMLAttributes<HTMLDivElement>;

/* ===================================================== */
/* COMPONENT */
/* ===================================================== */

export function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        /**
         * max-w-7xl
         * prevents stretched layouts
         *
         * px-6 lg:px-8
         * responsive spacing
         */
        "mx-auto w-full max-w-7xl px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
import type {
  LabelHTMLAttributes,
} from "react";

import {
  cn,
} from "@/lib/utils";

/* ===================================================== */
/* TYPES */
/* ===================================================== */

type LabelProps =
  LabelHTMLAttributes<HTMLLabelElement>;

/* ===================================================== */
/* COMPONENT */
/* ===================================================== */

export function Label({
  className,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        `
          text-sm
          font-medium

          leading-none

          text-slate-700

          cursor-pointer

          peer-disabled:cursor-not-allowed
          peer-disabled:opacity-70
        `,
        className
      )}
      {...props}
    />
  );
}
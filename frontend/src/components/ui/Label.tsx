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
        "text-sm font-medium text-slate-700",
        className
      )}
      {...props}
    />
  );
}
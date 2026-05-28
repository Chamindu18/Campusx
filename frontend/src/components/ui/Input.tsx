import {
  forwardRef,
  type InputHTMLAttributes,
} from "react";

import {
  cn,
} from "@/lib/utils";

/* ===================================================== */
/* TYPES */
/* ===================================================== */

type InputProps =
  InputHTMLAttributes<HTMLInputElement>;

/* ===================================================== */
/* COMPONENT */
/* ===================================================== */

export const Input =
  forwardRef<
    HTMLInputElement,
    InputProps
  >(
    (
      {
        className,
        ...props
      },
      ref
    ) => (
      <input
        ref={ref}
        className={cn(
          `
            h-14
            w-full

            rounded-2xl

            border
            border-white/15

            bg-white/80

            px-5

            text-slate-900

            placeholder:text-slate-500

            shadow-sm

            outline-none

            transition-all
            duration-300

            focus:bg-white

            focus:border-blue-400

            focus:ring-4
            focus:ring-blue-400/20
          `,
          className
        )}
        {...props}
      />
    )
  );

Input.displayName =
  "Input";
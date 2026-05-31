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
            h-12
            md:h-14

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

            focus-visible:bg-white

            focus-visible:border-blue-400

            focus-visible:ring-4
            focus-visible:ring-blue-400/20

            disabled:cursor-not-allowed
            disabled:opacity-60

            read-only:bg-slate-50
            read-only:text-slate-500

            autofill:bg-white
          `,
          className
        )}
        {...props}
      />
    )
  );

Input.displayName =
  "Input";
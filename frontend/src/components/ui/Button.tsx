/**
 * Reusable Button Component
 *
 * Prevents duplicated button styling.
 */

import {
  ButtonHTMLAttributes,
  forwardRef,
} from "react";

import { cn } from "@/lib/utils";

/* ===================================================== */
/* TYPES */
/* ===================================================== */

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "destructive";

type ButtonSize =
  | "sm"
  | "md"
  | "lg";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/* ===================================================== */
/* COMPONENT */
/* ===================================================== */

export const Button =
  forwardRef<
    HTMLButtonElement,
    ButtonProps
  >(
    (
      {
        children,
        className,
        variant = "primary",
        size = "md",
        type,
        ...props
      },
      ref
    ) => {
      const baseStyles =
        `
          inline-flex
          items-center
          justify-center

          rounded-xl

          font-medium

          transition-all
          duration-200

          active:scale-[0.98]

          focus-visible:outline-none
          focus-visible:ring-4
          focus-visible:ring-blue-400/20

          disabled:pointer-events-none
          disabled:opacity-50
        `;

      const variantStyles: Record<
        ButtonVariant,
        string
      > = {
        primary:
          `
            bg-blue-600
            text-white

            shadow-sm

            hover:bg-blue-700
          `,

        secondary:
          `
            bg-slate-100
            text-slate-900

            hover:bg-slate-200
          `,

        outline:
          `
            border
            border-slate-300

            bg-white

            text-slate-900

            hover:bg-slate-50
          `,

        destructive:
          `
            bg-red-600
            text-white

            hover:bg-red-700
          `,
      };

      const sizeStyles: Record<
        ButtonSize,
        string
      > = {
        sm:
          "h-11 px-4 text-sm",

        md:
          "h-12 px-5 text-sm",

        lg:
          "h-14 px-8 text-base",
      };

      return (
        <button
          ref={ref}
          type={
            type ??
            "button"
          }
          className={cn(
            baseStyles,
            variantStyles[
              variant
            ],
            sizeStyles[
              size
            ],
            className
          )}
          {...props}
        >
          {children}
        </button>
      );
    }
  );

Button.displayName =
  "Button";
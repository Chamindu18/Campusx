"use client";

/**
 * Cinematic marketplace search component.
 *
 * Features:
 * - rotating placeholder text
 * - premium glassmorphism styling
 * - smooth animated transitions
 */

import {
  useEffect,
  useState,
} from "react";

import { Search } from "lucide-react";

const placeholders = [
  "Search textbooks...",
  "Search electronics...",
  "Search gaming setups...",
  "Search dorm essentials...",
  "Search student listings...",
];

export function HeroSearch() {
  const [index, setIndex] =
    useState(0);

  /**
   * Rotate placeholder text.
   */
  useEffect(() => {
    const interval =
      setInterval(() => {
        setIndex((prev) =>
          prev ===
          placeholders.length - 1
            ? 0
            : prev + 1
        );
      }, 2500);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <div
      className="
        mt-10
        md:mt-14

        flex

        h-14
        md:h-16

        w-full
        max-w-2xl

        items-center
        gap-3
        md:gap-4

        rounded-2xl

        border
        border-white/40

        bg-white/70

        px-4
        md:px-6

        shadow-2xl
        shadow-slate-200/40

        backdrop-blur-xl
      "
    >
      {/* Search Icon */}

      <Search
        className="
          h-5
          w-5

          shrink-0

          text-slate-500
        "
      />

      {/* Animated Placeholder */}

      <div
        className="
          relative

          h-6

          flex-1

          overflow-hidden
        "
      >
        <div
          key={index}
          aria-hidden="true"
          className="
            truncate

            animate-[fadeSlide_0.5s_ease]

            text-base
            md:text-lg

            text-slate-500
          "
        >
          {
            placeholders[
              index
            ]
          }
        </div>
      </div>
    </div>
  );
}
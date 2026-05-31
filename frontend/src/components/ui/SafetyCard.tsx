"use client";

/**
 * Safety information card.
 */

import {
  motion,
  useReducedMotion,
} from "framer-motion";

interface SafetyCardProps {
  title: string;
  description: string;
}

export function SafetyCard({
  title,
  description,
}: SafetyCardProps) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -6,
            }
      }
      transition={{
        duration: 0.25,
      }}
      className="
        group
        relative
        overflow-hidden

        rounded-3xl

        border
        border-white/40

        bg-white/70

        p-5
        md:p-8

        shadow-xl
        shadow-slate-200/40

        backdrop-blur-xl
      "
    >
      {/* Glow */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-br
          from-blue-100/0
          via-indigo-100/0
          to-cyan-100/20

          opacity-0

          transition
          duration-500

          group-hover:opacity-100
        "
      />

      {/* Title */}

      <h3
        className="
          relative

          break-words

          text-xl
          md:text-2xl

          font-bold

          text-slate-900
        "
      >
        {title}
      </h3>

      {/* Description */}

      <p
        className="
          relative

          mt-4
          md:mt-5

          leading-7

          text-slate-600
        "
      >
        {description}
      </p>
    </motion.div>
  );
}
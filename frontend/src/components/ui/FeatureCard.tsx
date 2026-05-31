"use client";

/**
 * Premium feature card.
 */

import type {
  ElementType,
} from "react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ElementType;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -8,
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

        shadow-lg
        shadow-slate-200/40

        backdrop-blur-xl

        transition-all
        duration-300

        hover:shadow-2xl
      "
    >
      {/* Glow Layer */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-br
          from-blue-100/0
          via-indigo-100/0
          to-indigo-200/20

          opacity-0

          transition
          duration-500

          group-hover:opacity-100
        "
      />

      {/* Icon */}

      <div
        className="
          relative

          flex

          h-14
          w-14

          md:h-16
          md:w-16

          items-center
          justify-center

          rounded-2xl

          bg-gradient-to-br
          from-blue-100
          to-indigo-100

          text-blue-700
        "
      >
        <Icon
          className="
            h-7
            w-7

            md:h-8
            md:w-8
          "
        />
      </div>

      {/* Content */}

      <div className="relative mt-6 md:mt-8">
        <h3
          className="
            text-xl
            md:text-2xl

            font-bold

            text-slate-900
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-3
            md:mt-4

            leading-7

            text-slate-600
          "
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}
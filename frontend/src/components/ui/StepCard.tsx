"use client";

/**
 * Animated process step card.
 */

import { motion } from "framer-motion";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

export function StepCard({
  number,
  title,
  description,
}: StepCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/40
        bg-white/70
        p-4
        shadow-xl
        shadow-slate-200/40
        backdrop-blur-xl
        md:p-10
      "
    >
      {/* Step Number */}
      <div
        className="
          text-6xl
          font-black
          tracking-tight
          text-blue-100
        "
      >
        {number}
      </div>

      {/* Content */}
      <div className="relative mt-6">
        <h3 className="text-2xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-4 leading-7 text-slate-600">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
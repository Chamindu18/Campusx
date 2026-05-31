"use client";

/**
 * Reusable scroll reveal animation.
 *
 * Used for:
 * - smooth section appearance
 * - fade-up transitions
 * - cinematic scrolling experience
 */

import type {
  ReactNode,
} from "react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

interface RevealProps {
  children: ReactNode;

  className?: string;

  delay?: number;

  distance?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 60,
}: RevealProps) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? {
              opacity: 1,
            }
          : {
              opacity: 0,
              y: distance,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
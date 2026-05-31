"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const PARTICLES = Array.from(
  { length: 20 },
  (_, i) => i
);

export function AnimatedBackground() {
  const shouldReduceMotion =
    useReducedMotion();

  const { scrollYProgress } =
    useScroll();

  const backgroundY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [0, -250]
    );

  const opacity =
    useTransform(
      scrollYProgress,
      [0, 1],
      [1, 0.65]
    );

  return (
    <motion.div
      style={{
        y: shouldReduceMotion
          ? 0
          : backgroundY,
        opacity,
      }}
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" />

      {/* ORB 1 */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 120, 0],
                y: [0, -80, 0],
                scale: [1, 1.15, 1],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[-150px]
          top-[-150px]

          h-[450px]
          w-[450px]

          md:h-[700px]
          md:w-[700px]

          rounded-full
          bg-blue-400/40
          blur-3xl
        "
      />

      {/* ORB 2 */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, -120, 0],
                y: [0, 90, 0],
                scale: [1, 1.12, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[-120px]
          top-[200px]

          h-[420px]
          w-[420px]

          md:h-[650px]
          md:w-[650px]

          rounded-full
          bg-indigo-400/30
          blur-3xl
        "
      />

      {/* ORB 3 */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 80, 0],
                y: [0, -70, 0],
                scale: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-[-180px]
          left-[25%]

          h-[380px]
          w-[380px]

          md:h-[600px]
          md:w-[600px]

          rounded-full
          bg-cyan-300/30
          blur-3xl
        "
      />

      {/* PARTICLES */}
      {!shouldReduceMotion &&
        PARTICLES.map((particle) => (
          <motion.div
            key={particle}
            animate={{
              y: [0, -40, 0],
              x: [0, 10, 0],
              opacity: [
                0.2,
                0.8,
                0.2,
              ],
            }}
            transition={{
              duration:
                3 +
                (particle % 5),
              repeat:
                Infinity,
              delay:
                particle * 0.25,
            }}
            className="absolute rounded-full bg-blue-500/40"
            style={{
              width: `${
                4 +
                (particle % 5) * 3
              }px`,
              height: `${
                4 +
                (particle % 5) * 3
              }px`,
              left: `${
                (particle * 11) %
                100
              }%`,
              top: `${
                (particle * 19) %
                100
              }%`,
            }}
          />
        ))}

      {/* GRID */}
      <div
        className="
          absolute
          inset-0

          bg-[linear-gradient(to_right,#94a3b810_1px,transparent_1px),linear-gradient(to_bottom,#94a3b810_1px,transparent_1px)]

          bg-[size:64px_64px]
        "
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-white/20" />
    </motion.div>
  );
}
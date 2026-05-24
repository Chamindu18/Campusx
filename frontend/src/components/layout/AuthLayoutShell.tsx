"use client";

import type {
  ReactNode,
} from "react";

import Image from "next/image";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  usePathname,
} from "next/navigation";

interface AuthLayoutShellProps {
  children: ReactNode;
}

export function AuthLayoutShell({
  children,
}: AuthLayoutShellProps) {
  const pathname =
    usePathname();

  const background =
    pathname.includes(
      "register"
    )
      ? "/images/auth/register-bg.avif"
      : "/images/auth/login-bg.jpg";

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
      "
    >
      {/* BACKGROUND */}
      <Image
        src={
          background
        }
        alt="Campus background"
        fill
        priority
        sizes="100vw"
        className="
          object-cover
        "
      />

      {/* DARK OVERLAY */}
      <div
        className="
          absolute
          inset-0

          bg-black/40
        "
      />

      {/* SOFT CENTER LIGHT */}
      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_65%)]
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10

          flex
          min-h-screen

          items-center
          justify-center

          px-6
          py-12
        "
      >
        <AnimatePresence
          mode="wait"
        >
          <motion.div
            key={
              pathname
            }
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
              relative

              w-full
              max-w-[560px]
            "
          >
            {/* OUTER GLOW */}
            <div
              className="
                absolute
                inset-0

                rounded-[36px]

                bg-white/5

                blur-2xl
              "
            />

            {/* GLASS */}
            <div
              className="
                relative

                overflow-hidden

                rounded-[36px]

                border
                border-white/10

                bg-black/15

                px-10
                py-10

                shadow-[0_30px_90px_rgba(0,0,0,0.35)]

                backdrop-blur-xl
              "
            >
              {/* TOP HIGHLIGHT */}
              <div
                className="
                  absolute
                  left-0
                  top-0

                  h-[180px]
                  w-full

                  bg-gradient-to-b
                  from-white/8
                  to-transparent
                "
              />

              <div
                className="
                  relative
                  z-10
                "
              >
                {children}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
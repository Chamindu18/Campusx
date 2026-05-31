"use client";

import Link from "next/link";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

const reveal = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: (
    delay: number
  ) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      delay,
    },
  }),
};

export function CTASection() {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <section
      className="
        relative
        overflow-hidden

        py-20
        md:py-40
      "
    >
      {/* BACKGROUND */}

      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                scale: 1.03,
                opacity: 0,
              }
        }
        whileInView={{
          scale: 1,
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1,
        }}
        className="
          absolute
          inset-0

          bg-[url('/images/hero/campus-life.jpg')]
          bg-cover
          bg-center
        "
      />

      {/* OVERLAY */}

      <div
        className="
          absolute
          inset-0

          bg-black/70
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10

          mx-auto
          max-w-5xl

          px-6

          text-center
        "
      >
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          variants={
            shouldReduceMotion
              ? undefined
              : reveal
          }
          custom={0}
          className="
            text-sm

            uppercase

            tracking-[0.35em]

            text-blue-300
          "
        >
          Your next semester
        </motion.p>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          variants={
            shouldReduceMotion
              ? undefined
              : reveal
          }
          custom={0.15}
          className="
            mt-6
            md:mt-8

            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl

            font-black

            leading-tight

            text-white
          "
        >
          Start somewhere.
          <br />
          Campus life will
          figure out the rest.
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          variants={
            shouldReduceMotion
              ? undefined
              : reveal
          }
          custom={0.3}
          className="
            mx-auto

            mt-8
            md:mt-10

            max-w-2xl

            text-base
            md:text-lg

            leading-7
            md:leading-9

            text-white/70
          "
        >
          Discover places,
          find essentials,
          and make student life
          feel a little easier.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          variants={
            shouldReduceMotion
              ? undefined
              : reveal
          }
          custom={0.45}
          className="
            mt-10
            md:mt-14

            flex
            flex-col

            justify-center

            gap-4
            sm:flex-row
            sm:gap-5
          "
        >
          <Link
            href="/marketplace"
            className="
              rounded-2xl

              bg-white

              px-8
              py-4

              text-center

              font-semibold

              text-slate-900

              transition

              hover:bg-slate-100
            "
          >
            Explore Marketplace
          </Link>

          <Link
            href="/dorms"
            className="
              rounded-2xl

              border
              border-white/20

              px-8
              py-4

              text-center

              font-semibold

              text-white

              transition

              hover:bg-white/10
            "
          >
            Find Dorms
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
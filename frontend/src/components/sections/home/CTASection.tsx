"use client";

import Link from "next/link";

import { motion } from "framer-motion";

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
  return (
    <section
      className="
        relative
        overflow-hidden
        py-40
      "
    >
      {/* BACKGROUND */}
      <motion.div
        initial={{
          scale: 1.06,
          opacity: 0,
        }}
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
          variants={reveal}
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
          variants={reveal}
          custom={0.15}
          className="
            mt-8

            text-3xl
            font-black

            leading-tight

            text-white

            sm:text-4xl
            md:text-5xl
            md:text-6xl
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
          variants={reveal}
          custom={0.3}
          className="
            mx-auto
            mt-10

            max-w-2xl

            text-lg
            leading-9

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
          variants={reveal}
          custom={0.45}
          className="
            mt-14

            flex
            flex-wrap

            justify-center

            gap-5
          "
        >
          <Link
            href="/marketplace"
            className="
              hover-scale

              rounded-2xl

              bg-white

              px-8
              py-4

              font-semibold

              text-slate-900
            "
          >
            Explore Marketplace
          </Link>

          <Link
            href="/dorms"
            className="
              hover-scale

              rounded-2xl

              border
              border-white/20

              px-8
              py-4

              font-semibold

              text-white

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
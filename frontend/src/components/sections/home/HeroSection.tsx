"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";

import {
  Search,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

const dormKeywords = [
  "dorm",
  "boarding",
  "hostel",
  "room",
  "rooms",
  "girls dorm",
  "boys dorm",
  "rent",
  "accommodation",
  "nsbm",
  "sliit",
  "ucsc",
  "mora",
];

function isDormSearch(
  query: string
) {
  return dormKeywords.some(
    (item) =>
      query
        .toLowerCase()
        .includes(item)
  );
}

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: (
    delay = 0
  ) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      delay,
    },
  }),
};

export function HeroSection() {
  const router =
    useRouter();

  const [
    search,
    setSearch,
  ] =
    useState("");

  function handleSearch() {
    const value =
      search.trim();

    if (!value)
      return;

    const encoded =
      encodeURIComponent(
        value
      );

    if (
      isDormSearch(
        value
      )
    ) {
      router.push(
        `/dorms?search=${encoded}`
      );

      return;
    }

    router.push(
      `/marketplace?search=${encoded}`
    );
  }

  return (
    <section
      id="hero"
      className="
        relative
        min-h-screen
        overflow-hidden
      "
    >
      {/* BACKGROUND */}
      <motion.div
        initial={{
          scale: 1.06,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.1,
        }}
        className="
          absolute
          inset-0
        "
      >
        <Image
          src="/images/hero/campus-life.jpg"
          alt="Campus life"

          fill
          priority
          quality={90}
          sizes="100vw"

          className="
            object-cover
          "
        />
      </motion.div>

      {/* OVERLAYS */}
      <div
        className="
          absolute
          inset-0
          bg-black/45
        "
      />

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-b
          from-black/35
          via-black/10
          to-black/70
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10

          mx-auto

          flex
          min-h-screen

          max-w-7xl

          items-center
          justify-center

          px-6

          pt-32
          pb-20
        "
      >
        <div
          className="
            max-w-4xl
            text-center
          "
        >
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.1}
            className="
              text-3xl
              font-black
              leading-[1]

              text-white

              sm:text-4xl
              md:text-5xl
              lg:text-7xl
            "
          >
            Campus life moves fast.

            <span
              className="
                mt-4
                block
                text-blue-300
              "
            >
              Find everything in one place.
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.25}
            className="
              mx-auto
              mt-8

              max-w-2xl

              text-lg
              leading-9

              text-white/85
            "
          >
            Discover dorms,
            buy essentials,
            sell what you no longer need,
            and connect with students —
            all in one place.
          </motion.p>

          {/* SEARCH */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.4}
            className="
              mx-auto
              mt-14

              max-w-3xl
            "
          >
            <div
              className="
                rounded-[30px]

                border
                border-white/15

                bg-white/10

                p-4

                backdrop-blur-xl
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-4

                  lg:flex-row
                "
              >
                <div
                  className="
                    flex
                    h-16
                    flex-1

                    items-center
                    gap-4

                    rounded-2xl

                    bg-white

                    px-6
                  "
                >
                  <Search
                    className="
                      h-5
                      w-5
                      text-slate-500
                    "
                  />

                  <input
                    value={
                      search
                    }
                    onChange={(e) =>
                      setSearch(
                        e.target
                          .value
                      )
                    }
                    onKeyDown={(
                      e
                    ) => {
                      if (
                        e.key ===
                        "Enter"
                      ) {
                        handleSearch();
                      }
                    }}
                    placeholder="Search dorms, books, laptops..."
                    className="
                      w-full

                      bg-transparent

                      text-slate-900

                      placeholder:text-slate-500

                      outline-none
                    "
                  />
                </div>

                <button
                  onClick={
                    handleSearch
                  }
                  className="
                    rounded-2xl

                    bg-blue-600

                    px-10

                    text-white

                    transition

                    hover:bg-blue-700
                  "
                >
                  Start Exploring
                </button>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.55}
            className="
              mt-10

              flex
              flex-wrap

              justify-center

              gap-5
            "
          >
            <Link
              href="/marketplace"
              className="
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
                rounded-2xl

                border
                border-white/25

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
      </div>
    </section>
  );
}
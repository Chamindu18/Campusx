"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
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
    if (
      !search.trim()
    )
      return;

    const encoded =
      encodeURIComponent(
        search
      );

    if (
      isDormSearch(
        search
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
      className="
        relative
        min-h-[900px]
        overflow-hidden
      "
    >
      {/* BG */}
      <motion.div
        initial={{
          scale: 1.08,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
        }}
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
            brightness-[0.78]
          "
        />
      </motion.div>

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-black/60
          via-black/45
          to-black/75
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[900px]
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
            custom={0.15}
            className="
              text-5xl
              font-black
              leading-[1]
              text-white
              sm:text-6xl
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
            custom={0.3}
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

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.45}
            className="
              mt-6
              text-sm
              uppercase
              tracking-[0.35em]
              text-white/60
            "
          >
            Buy • Sell • Stay • Connect
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.6}
            className="
              mx-auto
              mt-8
              max-w-3xl
            "
          >
            <div
              className="
                rounded-[30px]
                border
                border-white/20
                bg-white/8
                p-4
                backdrop-blur-2xl
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
                      text-slate-400
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
                    placeholder="Search dorms, books, laptops..."
                    className="
                      w-full
                      bg-transparent
                      outline-none
                    "
                  />
                </div>

                <button
                  onClick={
                    handleSearch
                  }
                  className="
                    hover-scale
                    h-16
                    rounded-2xl
                    bg-blue-600
                    px-10
                    font-semibold
                    text-white
                  "
                >
                  Start Exploring
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.75}
            className="
              mt-8
              flex
              justify-center
              gap-4
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
                border-white/30
                px-8
                py-4
                text-white
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
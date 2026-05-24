"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

const items = [
  {
    label:
      "Student Dorms",

    title:
      "Find where you belong.",

    description:
      "Discover places to stay and make moving near campus easier.",

    href:
      "/dorms",

    image:
      "/images/hero/campus-life.jpg",
  },

  {
    label:
      "Marketplace",

    title:
      "Find what you need.",

    description:
      "Explore essentials and student-to-student listings.",

    href:
      "/marketplace",

    image:
      "/images/hero/campus-life.jpg",
  },
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 30,
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

export function ShowcaseSection() {
  return (
    <section
      className="
        relative
        bg-slate-950
        py-40
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-6
        "
      >
        {/* HEADER */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
          variants={reveal}
          custom={0}
          className="
            text-center
          "
        >
          <p
            className="
              text-sm
              uppercase
              tracking-[0.35em]
              text-blue-300
            "
          >
            Discover
          </p>

          <h2
            className="
              mt-6
              text-5xl
              font-black
              text-white
            "
          >
            Imagine using it.
          </h2>

          <p
            className="
              mx-auto
              mt-8
              max-w-2xl
              text-lg
              leading-9
              text-white/65
            "
          >
            See how CampusX fits naturally
            into everyday student life.
          </p>
        </motion.div>

        {/* CARDS */}
        <div
          className="
            mt-24
            grid
            gap-8
            lg:grid-cols-2
          "
        >
          {items.map(
            (
              item,
              index
            ) => (
              <motion.div
                key={
                  item.title
                }
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                variants={reveal}
                custom={
                  index *
                  0.12
                }
              >
                <Link
                  href={
                    item.href
                  }
                  className="
                    block
                  "
                >
                  <div
                    className="
                      group
                      overflow-hidden
                      rounded-[36px]
                      border
                      border-white/10
                      bg-white/5
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-white/[0.08]
                    "
                  >
                    {/* IMAGE */}
                    <div
                      className="
                        relative
                        h-[320px]
                        overflow-hidden
                      "
                    >
                      <Image
                        src={
                          item.image
                        }
                        alt={
                          item.title
                        }
                        fill
                        sizes="50vw"
                        className="
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-105
                        "
                      />

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/75
                          via-black/10
                          to-transparent
                        "
                      />
                    </div>

                    {/* CONTENT */}
                    <div
                      className="
                        p-10
                      "
                    >
                      <div
                        className="
                          text-sm
                          text-blue-300
                        "
                      >
                        {
                          item.label
                        }
                      </div>

                      <h3
                        className="
                          mt-5
                          text-4xl
                          font-black
                          text-white
                        "
                      >
                        {
                          item.title
                        }
                      </h3>

                      <p
                        className="
                          mt-6
                          leading-8
                          text-white/65
                        "
                      >
                        {
                          item.description
                        }
                      </p>

                      <div
                        className="
                          mt-10
                          inline-flex
                          items-center
                          gap-3
                          rounded-full
                          bg-blue-500/10
                          px-5
                          py-3
                          font-medium
                          text-blue-300
                          transition
                          group-hover:bg-blue-500/20
                        "
                      >
                        Explore

                        <ArrowRight
                          className="
                            h-4
                            w-4
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                          "
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
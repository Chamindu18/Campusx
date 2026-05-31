"use client";

import Link from "next/link";

import {
  BookOpen,
  Home,
  Laptop,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

const categories = [
  {
    title: "Student Dorms",
    description:
      "Find places to stay close to university and settle into campus life.",
    icon: Home,
    href: "/dorms",
  },
  {
    title: "Marketplace",
    description:
      "Discover electronics, furniture and student essentials.",
    icon: Laptop,
    href: "/marketplace",
  },
  {
    title: "Study Essentials",
    description:
      "Books, desks and useful things that support learning.",
    icon: BookOpen,
    href: "/marketplace",
  },
  {
    title: "Connect",
    description:
      "Talk directly with students and make decisions easier.",
    icon: MessageCircle,
    href: "/messages",
  },
];

export function CategoriesSection() {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <section
      id="categories"
      className="
        relative
        bg-white
        py-20
        md:py-40
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
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 24,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >
          <p
            className="
              text-sm
              uppercase
              tracking-[0.35em]
              text-blue-600
            "
          >
            Explore
          </p>

          <h2
            className="
              mt-6

              text-3xl
              sm:text-4xl
              md:text-5xl

              font-black

              text-slate-900
            "
          >
            Start where
            student life happens.
          </h2>

          <p
            className="
              mx-auto

              mt-6
              md:mt-8

              max-w-2xl

              text-base
              md:text-lg

              leading-7
              md:leading-9

              text-slate-600
            "
          >
            Explore categories designed
            around the way students
            actually live and move.
          </p>
        </motion.div>

        {/* GRID */}

        <div
          className="
            mt-12
            md:mt-24

            grid
            grid-cols-1

            gap-6
            md:grid-cols-2
            md:gap-8
          "
        >
          {categories.map(
            (
              category,
              index
            ) => {
              const Icon =
                category.icon;

              return (
                <motion.div
                  key={
                    category.title
                  }
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 24,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.6,
                    delay:
                      index * 0.08,
                  }}
                >
                  <Link
                    href={
                      category.href
                    }
                    className="block h-full"
                  >
                    <div
                      className="
                        group

                        h-full

                        rounded-[32px]

                        border
                        border-slate-200

                        bg-white

                        p-5
                        md:p-10

                        shadow-sm

                        transition-all
                        duration-300

                        hover:-translate-y-1
                        hover:border-blue-200
                        hover:shadow-xl
                      "
                    >
                      <div
                        className="
                          flex

                          h-14
                          w-14
                          md:h-16
                          md:w-16

                          items-center
                          justify-center

                          rounded-2xl

                          bg-blue-50

                          transition
                          duration-300

                          group-hover:scale-105
                        "
                      >
                        <Icon
                          className="
                            h-7
                            w-7
                            md:h-8
                            md:w-8

                            text-blue-600
                          "
                        />
                      </div>

                      <h3
                        className="
                          mt-6
                          md:mt-8

                          text-2xl
                          md:text-3xl

                          font-bold

                          text-slate-900
                        "
                      >
                        {category.title}
                      </h3>

                      <p
                        className="
                          mt-4
                          md:mt-5

                          leading-7
                          md:leading-8

                          text-slate-600
                        "
                      >
                        {category.description}
                      </p>

                      <div
                        className="
                          mt-8
                          md:mt-10

                          flex
                          items-center
                          gap-3

                          font-semibold

                          text-blue-600
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
                  </Link>
                </motion.div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
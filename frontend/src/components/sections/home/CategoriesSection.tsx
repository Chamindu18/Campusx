"use client";

import Link from "next/link";

import {
  BookOpen,
  Home,
  Laptop,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";

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
      duration: 0.6,
      delay,
    },
  }),
};

export function CategoriesSection() {
  return (
    <section
      id="categories"
      className="
        relative
        bg-white
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
              text-4xl
              font-black
              text-slate-900
              md:text-5xl
            "
          >
            Start where
            student life happens.
          </h2>

          <p
            className="
              mx-auto
              mt-8
              max-w-2xl
              text-lg
              leading-9
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
            mt-24
            grid
            gap-8
            md:grid-cols-2
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
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  variants={reveal}
                  custom={
                    index * 0.08
                  }
                >
                  <Link
                    href={
                      category.href
                    }
                    className="block"
                  >
                    <div
                      className="
                        group
                        h-full
                        rounded-[32px]
                        border
                        border-slate-200
                        bg-white
                        p-4
                        shadow-sm
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-blue-200
                        hover:shadow-xl
                        md:p-10
                      "
                    >
                      <div
                        className="
                          flex
                          h-16
                          w-16
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
                            h-8
                            w-8
                            text-blue-600
                          "
                        />
                      </div>

                      <h3
                        className="
                          mt-8
                          text-3xl
                          font-bold
                          text-slate-900
                        "
                      >
                        {category.title}
                      </h3>

                      <p
                        className="
                          mt-5
                          leading-8
                          text-slate-600
                        "
                      >
                        {
                          category.description
                        }
                      </p>

                      <div
                        className="
                          mt-10
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
"use client";

import Link from "next/link";

import {
  BookOpen,
  Home,
  Laptop,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

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
    title:
      "Study Essentials",

    description:
      "Books, desks and useful things that support learning.",

    icon:
      BookOpen,

    href:
      "/marketplace",
  },

  {
    title:
      "Connect",

    description:
      "Talk directly with students and make decisions easier.",

    icon:
      MessageCircle,

    href:
      "/messages",
  },
];

export function CategoriesSection() {
  return (
    <section
      className="
        relative
        bg-white
        py-32
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
        <div
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
        </div>

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
              category
            ) => {
              const Icon =
                category.icon;

              return (
                <Link
                  key={
                    category.title
                  }
                  href={
                    category.href
                  }
                >
                  <div
                    className="
                      group
                      h-full
                      rounded-[32px]
                      border
                      border-slate-200
                      bg-white
                      p-10
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-blue-200
                      hover:shadow-xl
                    "
                  >
                    {/* ICON */}
                    <div
                      className="
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-2xl
                        bg-blue-50
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

                    {/* CONTENT */}
                    <h3
                      className="
                        mt-8
                        text-3xl
                        font-bold
                        text-slate-900
                      "
                    >
                      {
                        category.title
                      }
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

                    {/* FOOTER */}
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
                          transition
                          group-hover:translate-x-1
                        "
                      />
                    </div>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
"use client";

/**
 * Story section —
 * why CampusX exists.
 */

import {
  BookOpen,
  Home,
  MessageCircle,
} from "lucide-react";

const stories = [
  {
    icon: BookOpen,

    title:
      "Find what you actually need",

    description:
      "Books, electronics, furniture and student essentials without endless searching.",
  },

  {
    icon: Home,

    title:
      "Settle into campus life",

    description:
      "Discover places to stay and make moving easier.",
  },

  {
    icon:
      MessageCircle,

    title:
      "Connect naturally",

    description:
      "Talk directly and make decisions without friction.",
  },
];

export function FeaturesSection() {
  return (
    <section
      className="
        bg-white
        py-36
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-6
        "
      >
        {/* INTRO */}
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
              text-slate-400
            "
          >
            Student Life
          </p>

          <h2
            className="
              mt-6
              text-4xl
              font-black
              leading-tight
              text-slate-900
              md:text-5xl
            "
          >
            Student life already
            comes with enough decisions.
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
            Finding what you need
            shouldn’t feel like
            another assignment.
          </p>
        </div>

        {/* ITEMS */}
        <div
          className="
            mt-24
            grid
            gap-12
            md:grid-cols-3
          "
        >
          {stories.map(
            (
              item
            ) => {
              const Icon =
                item.icon;

              return (
                <div
                  key={
                    item.title
                  }
                >
                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-slate-100
                    "
                  >
                    <Icon
                      className="
                        h-7
                        w-7
                        text-slate-900
                      "
                    />
                  </div>

                  <h3
                    className="
                      mt-8
                      text-2xl
                      font-bold
                    "
                  >
                    {
                      item.title
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
                      item.description
                    }
                  </p>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
"use client";

/**
 * Story section —
 * life before solution.
 */

import {
  BookOpen,
  Home,
  MessageCircle,
} from "lucide-react";

import { Container } from "@/components/ui/Container";

const stories = [
  {
    icon: BookOpen,

    title:
      "Find what you actually need",

    description:
      "Books, electronics, furniture and student essentials shouldn't take days of searching.",
  },

  {
    icon: Home,

    title:
      "Settle into campus life",

    description:
      "Discover dorms and places to stay without endless messages and uncertainty.",
  },

  {
    icon:
      MessageCircle,

    title:
      "Connect naturally",

    description:
      "Talk directly with students and make decisions without unnecessary friction.",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="
        relative
        bg-white
        py-36
      "
    >
      <Container>
        {/* STORY INTRO */}
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
            comes with enough
            decisions.
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
            Finding things,
            finding places,
            and connecting with people
            should feel easier —
            not like another assignment.
          </p>
        </div>

        {/* STORY BLOCKS */}
        <div
          className="
            mt-24
            grid
            gap-10
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
                  className="
                    flex
                    flex-col
                    items-start
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
                      bg-slate-100
                    "
                  >
                    <Icon
                      className="
                        h-7
                        w-7
                        text-slate-800
                      "
                    />
                  </div>

                  <h3
                    className="
                      mt-8
                      text-2xl
                      font-bold
                      text-slate-900
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
      </Container>
    </section>
  );
}
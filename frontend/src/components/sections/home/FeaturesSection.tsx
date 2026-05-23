"use client";

import {
  ArrowRight,
} from "lucide-react";

const stories = [
  {
    number: "01",

    title:
      "Finding things shouldn't take days",

    description:
      "Whether it's a laptop, study desk or something small — students shouldn't have to search everywhere.",
  },

  {
    number: "02",

    title:
      "Moving near campus should feel easier",

    description:
      "Finding a place to stay should feel predictable and less stressful.",
  },

  {
    number: "03",

    title:
      "People make campus life easier",

    description:
      "Conversations and community matter as much as listings.",
  },
];

export function FeaturesSection() {
  return (
    <section
      className="
        relative
        bg-slate-50
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
            max-w-4xl
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
            Why CampusX
          </p>

          <h2
            className="
              mt-6
              text-5xl
              font-black
              leading-tight
              text-slate-900
            "
          >
            Student life already
            comes with enough
            decisions.
          </h2>

          <p
            className="
              mt-8
              max-w-2xl
              text-lg
              leading-9
              text-slate-600
            "
          >
            Finding what you need,
            where to stay,
            and who to trust
            should feel simpler.
          </p>
        </div>

        {/* STORY */}
        <div
          className="
            mt-28
            space-y-10
          "
        >
          {stories.map(
            (
              item
            ) => (
              <div
                key={
                  item.number
                }
                className="
                  group
                  rounded-[32px]
                  bg-white
                  p-10
                  shadow-sm
                  transition
                  hover:shadow-lg
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    gap-8
                    md:flex-row
                    md:items-center
                    md:justify-between
                  "
                >
                  <div>
                    <div
                      className="
                        text-sm
                        font-bold
                        text-blue-600
                      "
                    >
                      {
                        item.number
                      }
                    </div>

                    <h3
                      className="
                        mt-3
                        text-3xl
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
                        max-w-2xl
                        leading-8
                        text-slate-600
                      "
                    >
                      {
                        item.description
                      }
                    </p>
                  </div>

                  <ArrowRight
                    className="
                      h-6
                      w-6
                      text-slate-300
                      transition
                      group-hover:translate-x-2
                    "
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
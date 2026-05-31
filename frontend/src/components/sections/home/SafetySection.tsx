"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

const principles = [
  {
    title:
      "Student focused",

    description:
      "Built around how students actually discover, move and connect.",
  },

  {
    title:
      "Simple interactions",

    description:
      "Less complexity and fewer steps to find what matters.",
  },

  {
    title:
      "Real connections",

    description:
      "Talk directly and make decisions naturally.",
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
      duration: 0.65,
      delay,
    },
  }),
};

export function SafetySection() {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <section
      id="safety"
      className="
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
              : "hidden"
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : "visible"
          }
          viewport={{
            once: true,
            amount: 0.3,
          }}
          variants={
            shouldReduceMotion
              ? undefined
              : reveal
          }
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
            Built For Students
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
            Designed to feel
            straightforward.
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
            No unnecessary complexity.
            Just a place that helps
            students find what matters.
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
            md:gap-8

            md:grid-cols-3
          "
        >
          {principles.map(
            (
              item,
              index
            ) => (
              <motion.div
                key={
                  item.title
                }
                initial={
                  shouldReduceMotion
                    ? false
                    : "hidden"
                }
                whileInView={
                  shouldReduceMotion
                    ? undefined
                    : "visible"
                }
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                variants={
                  shouldReduceMotion
                    ? undefined
                    : reveal
                }
                custom={
                  index * 0.08
                }
              >
                <div
                  className="
                    group

                    rounded-[30px]

                    bg-slate-50

                    p-5
                    md:p-10

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:bg-white
                    hover:shadow-lg
                  "
                >
                  <h3
                    className="
                      text-xl
                      md:text-2xl

                      font-bold

                      text-slate-900
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-5

                      leading-7
                      md:leading-8

                      text-slate-600
                    "
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
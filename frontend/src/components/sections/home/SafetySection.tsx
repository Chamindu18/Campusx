"use client";

import { motion } from "framer-motion";

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
  return (
    <section
      id="safety"
      className="
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
            Built For Students
          </p>

          <h2
            className="
              mt-6
              text-5xl
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
              mt-8
              max-w-2xl
              text-lg
              leading-9
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
            mt-24
            grid
            gap-8
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
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                variants={reveal}
                custom={
                  index *
                  0.08
                }
              >
                <div
                  className="
                    group
                    rounded-[30px]
                    bg-slate-50
                    p-10
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-white
                    hover:shadow-lg
                  "
                >
                  <h3
                    className="
                      text-2xl
                      font-bold
                      text-slate-900
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-5
                      leading-8
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
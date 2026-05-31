"use client";

/**
 * Homepage features section.
 */

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { features } from "@/constants/home";

import { Container } from "@/components/ui/Container";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

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

export function FeaturesSection() {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <section
      id="features"
      className="
        relative
        overflow-hidden

        py-20
        md:py-40
      "
    >
      {/* SOFT BACKGROUND */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-b
          from-transparent
          via-slate-50
          to-transparent
        "
      />

      {/* LIGHT GLOW */}

      <div
        className="
          absolute

          left-1/2
          top-32
          md:top-40

          h-[300px]
          w-[300px]

          md:h-[420px]
          md:w-[420px]

          -translate-x-1/2

          rounded-full

          bg-blue-100/40

          blur-3xl
        "
      />

      <Container
        className="
          relative
          z-10
        "
      >
        {/* HEADER */}

        <Reveal>
          <SectionTitle
            title="Designed for safer campus trading"
            subtitle="CampusX focuses on trust, simplicity, and modern student experiences."
          />
        </Reveal>

        {/* GRID */}

        <div
          className="
            mt-12
            md:mt-24

            grid
            grid-cols-1

            gap-6
            md:gap-8

            lg:grid-cols-2
          "
        >
          {features.map(
            (
              feature,
              index
            ) => (
              <motion.div
                key={
                  feature.title
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
                className="
                  hover-lift
                "
              >
                <FeatureCard
                  title={
                    feature.title
                  }
                  description={
                    feature.description
                  }
                  icon={
                    feature.icon
                  }
                />
              </motion.div>
            )
          )}
        </div>
      </Container>
    </section>
  );
}
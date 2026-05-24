"use client";

import Link from "next/link";

import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer
      className="
        relative
        overflow-hidden
        bg-slate-950
        text-white
      "
    >
      {/* BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-slate-900
          via-slate-950
          to-black
        "
      />

      {/* GLOW */}
      <div
        className="
          absolute
          left-1/2
          top-0
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      <Container>
        <div
          className="
            relative
            z-10
            py-24
          "
        >
          {/* TOP */}
          <div
            className="
              flex
              flex-col
              items-center
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
              CampusX
            </p>

            <h2
              className="
                mt-6
                max-w-3xl
                text-5xl
                font-black
                leading-tight
                md:text-6xl
              "
            >
              Student life,
              simplified.
            </h2>

            <p
              className="
                mt-8
                max-w-2xl
                text-lg
                leading-9
                text-white/65
              "
            >
              Discover places,
              connect with students,
              and find what matters.
            </p>
          </div>

          {/* LINKS */}
          <div
            className="
              mt-20
              flex
              flex-wrap
              justify-center
              gap-10
            "
          >
            {[
              [
                "Marketplace",
                "/marketplace",
              ],

              [
                "Dorms",
                "/dorms",
              ],

              [
                "Features",
                "#features",
              ],

              [
                "How It Works",
                "#how-it-works",
              ],
            ].map(
              (
                item
              ) => (
                <Link
                  key={
                    item[0]
                  }
                  href={
                    item[1]
                  }
                  className="
                    text-white/65
                    transition
                    duration-300
                    hover:text-white
                  "
                >
                  {
                    item[0]
                  }
                </Link>
              )
            )}
          </div>

          {/* DIVIDER */}
          <div
            className="
              mt-20
              h-px
              bg-white/10
            "
          />

          {/* BOTTOM */}
          <div
            className="
              mt-10
              flex
              flex-col
              items-center
              justify-between
              gap-4
              text-sm
              text-white/45
              md:flex-row
            "
          >
            <div>
              © 2026 CampusX
            </div>

            <div>
              Built for students.
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
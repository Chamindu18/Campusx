"use client";

import Link from "next/link";

import { Container } from "@/components/ui/Container";

const footerLinks = [
  {
    label: "Marketplace",
    href: "/marketplace",
  },
  {
    label: "Dorms",
    href: "/dorms",
  },
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Safety",
    href: "#safety",
  },
  {
    label: "How It Works",
    href: "#how-it-works",
  },
];

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
      <Container>
        <div
          className="
            py-16
            md:py-24
          "
        >
          {/* HEADER */}

          <div className="text-center">
            <p
              className="
                text-blue-300
                font-medium
              "
            >
              CampusX
            </p>

            <h2
              className="
                mt-4

                text-3xl
                sm:text-4xl
                md:text-5xl

                font-black

                tracking-tight
              "
            >
              Student life,
              simplified.
            </h2>

            <p
              className="
                mx-auto

                mt-6

                max-w-xl

                text-white/70
              "
            >
              Discover places,
              connect and explore.
            </p>
          </div>

          {/* NAVIGATION */}

          <div
            className="
              mt-12
              md:mt-20

              flex
              flex-wrap

              justify-center

              gap-5
              md:gap-10
            "
          >
            {footerLinks.map(
              (item) => (
                <Link
                  key={
                    item.href
                  }
                  href={
                    item.href
                  }
                  scroll
                  className="
                    text-white/70

                    transition-colors
                    duration-200

                    hover:text-white
                  "
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* COPYRIGHT */}

          <div
            className="
              mt-12
              md:mt-16

              border-t
              border-white/10

              pt-8

              text-center

              text-sm

              text-white/40
            "
          >
            © 2026 CampusX
          </div>
        </div>
      </Container>
    </footer>
  );
}
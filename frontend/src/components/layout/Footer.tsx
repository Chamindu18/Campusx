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
            py-24
          "
        >
          <div
            className="
              text-center
            "
          >
            <p
              className="
                text-blue-300
              "
            >
              CampusX
            </p>

            <h2
              className="
                mt-5

                text-5xl
                font-black
              "
            >
              Student life,
              simplified.
            </h2>

            <p
              className="
                mt-8

                text-white/70
              "
            >
              Discover places,
              connect and explore.
            </p>
          </div>

          <div
            className="
              mt-20

              flex
              flex-wrap

              justify-center

              gap-10
            "
          >
            {footerLinks.map(
              (
                item
              ) => (
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

                    hover:text-white
                  "
                >
                  {
                    item.label
                  }
                </Link>
              )
            )}
          </div>

          <div
            className="
              mt-16

              border-t
              border-white/10

              pt-8

              text-center

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
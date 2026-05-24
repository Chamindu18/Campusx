"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NotificationBell } from "@/components/ui/NotificationBell";

const navItems = [
  {
    label: "Categories",
    href: "#categories",
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

export function Navbar() {
  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        fixed
        top-0
        z-50
        w-full
      "
    >
      <Container>
        <div
          className="
            mt-5
            flex
            h-20
            items-center
            justify-between

            rounded-[28px]

            border
            border-white/20

            bg-white/65

            px-6

            backdrop-blur-xl
          "
        >
          <Link
            href="/"
            className="
              text-3xl
              font-black
              text-slate-900
            "
          >
            CampusX
          </Link>

          <nav
            className="
              hidden
              items-center
              gap-8
              md:flex
            "
          >
            {navItems.map(
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
                    text-sm
                    font-medium

                    text-slate-700

                    transition

                    hover:text-black
                  "
                >
                  {
                    item.label
                  }
                </Link>
              )
            )}
          </nav>

          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
              >
                Login
              </Button>
            </Link>

            <Link href="/signup">
              <Button size="sm">
                Get Started
              </Button>
            </Link>

            <NotificationBell />
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
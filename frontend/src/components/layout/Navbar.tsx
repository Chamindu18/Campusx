"use client";

/**
 * Homepage navbar.
 */

import Link from "next/link";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NotificationBell } from "@/components/ui/NotificationBell";

export function Navbar() {
  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -16,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="
        fixed
        left-0
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
            shadow-lg
            shadow-slate-200/20
            backdrop-blur-xl
          "
        >
          {/* LOGO */}
          <Link
            href="/"
            className="
              text-3xl
              font-black
              tracking-tight
              text-slate-900
            "
          >
            CampusX
          </Link>

          {/* NAV */}
          <nav
            className="
              hidden
              items-center
              gap-8
              md:flex
            "
          >
            {[
              [
                "Categories",
                "#categories",
              ],

              [
                "Features",
                "#features",
              ],

              [
                "Safety",
                "#safety",
              ],

              [
                "How It Works",
                "#how-it-works",
              ],
            ].map(
              (
                item
              ) => (
                <a
                  key={
                    item[0]
                  }
                  href={
                    item[1]
                  }
                  className="
                    relative
                    text-sm
                    font-medium
                    text-slate-600
                    transition
                    hover:text-slate-900
                  "
                >
                  {
                    item[0]
                  }
                </a>
              )
            )}
          </nav>

          {/* ACTIONS */}
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <Link
              href="/login"
            >
              <Button
                variant="outline"
                size="sm"
                className="
                  hover-scale
                "
              >
                Login
              </Button>
            </Link>

            <Link
              href="/signup"
            >
              <Button
                size="sm"
                className="
                  hover-scale
                "
              >
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
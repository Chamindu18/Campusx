"use client";

import { useState } from "react";

import Link from "next/link";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Menu,
  X,
} from "lucide-react";

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
  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  return (
    <>
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
              mt-4

              flex

              h-16
              md:h-20

              items-center
              justify-between

              rounded-[24px]
              md:rounded-[28px]

              border
              border-white/20

              bg-white/65

              px-4
              md:px-6

              backdrop-blur-xl
            "
          >
            {/* LOGO */}

            <Link
              href="/"
              className="
                text-2xl
                md:text-3xl

                font-black

                text-slate-900
              "
            >
              CampusX
            </Link>

            {/* DESKTOP NAV */}

            <nav
              className="
                hidden
                items-center
                gap-8
                md:flex
              "
            >
              {navItems.map(
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
                      text-sm
                      font-medium

                      text-slate-700

                      transition

                      hover:text-black
                    "
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* DESKTOP ACTIONS */}

            <div
              className="
                hidden
                items-center
                gap-3
                md:flex
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

            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              aria-label="Open menu"
              onClick={() =>
                setMobileOpen(
                  true
                )
              }
              className="
                flex

                h-10
                w-10

                items-center
                justify-center

                rounded-xl

                bg-white

                md:hidden
              "
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </motion.header>

      {/* MOBILE MENU */}

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setMobileOpen(
                  false
                )
              }
              className="
                fixed
                inset-0
                z-50
                bg-black/50
              "
            />

            <motion.div
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              className="
                fixed
                right-0
                top-0
                z-[60]

                h-screen
                w-[300px]

                bg-white

                p-6

                shadow-2xl
              "
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() =>
                    setMobileOpen(
                      false
                    )
                  }
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-8 space-y-5">
                {navItems.map(
                  (item) => (
                    <Link
                      key={
                        item.href
                      }
                      href={
                        item.href
                      }
                      onClick={() =>
                        setMobileOpen(
                          false
                        )
                      }
                      className="
                        block

                        text-lg
                        font-medium
                      "
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>

              <div className="mt-10 space-y-4">
                <Link
                  href="/login"
                  className="block"
                >
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Login
                  </Button>
                </Link>

                <Link
                  href="/signup"
                  className="block"
                >
                  <Button
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
"use client";

/**
 * Platform sidebar navigation.
 */

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Store,
  MessageSquare,
  User,
  Settings,
  PlusSquare,
  Home,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface SidebarProps {
  onClose?: () => void;
}

/**
 * Sidebar navigation items.
 */
const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Marketplace",
    href: "/marketplace",
    icon: Store,
  },
  {
    title: "Dorms",
    href: "/dorms",
    icon: Home,
  },
  {
    title: "Create Dorm",
    href: "/create-dorm",
    icon: PlusSquare,
  },
  {
    title: "Create Listing",
    href: "/create-listing",
    icon: PlusSquare,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar({
  onClose,
}: SidebarProps) {
  const pathname =
    usePathname();

  return (
    <aside
      className="
        relative

        flex

        min-h-screen

        w-full
        max-w-[280px]

        flex-col

        border-r
        border-white/20

        bg-white/70

        px-5
        md:px-6

        py-8

        backdrop-blur-xl
      "
    >
      {/* MOBILE CLOSE BUTTON */}

      <button
        type="button"
        aria-label="Close sidebar"
        onClick={onClose}
        className="
          absolute

          right-5
          top-5

          flex

          h-10
          w-10

          items-center
          justify-center

          rounded-xl

          bg-white/70

          text-slate-700

          transition

          hover:bg-white

          lg:hidden
        "
      >
        <X className="h-5 w-5" />
      </button>

      {/* BRAND */}

      <div>
        <Link
          href="/"
          className="
            text-3xl
            md:text-4xl

            font-black

            tracking-tight

            text-slate-900
          "
        >
          CampusX
        </Link>

        <p className="mt-3 text-sm text-slate-500">
          Student marketplace platform
        </p>
      </div>

      {/* NAVIGATION */}

      <nav className="mt-12 flex flex-1 flex-col gap-2 overflow-y-auto">
        {navigationItems.map(
          (item) => {
            const isActive =
              item.href ===
              "/dashboard"
                ? pathname ===
                  "/dashboard"
                : pathname.startsWith(
                    item.href
                  );

            const Icon =
              item.icon;

            return (
              <Link
                key={
                  item.href
                }
                href={
                  item.href
                }
                onClick={
                  onClose
                }
                className={cn(
                  `
                    group

                    flex

                    items-center

                    gap-4

                    rounded-2xl

                    px-5
                    py-4

                    text-sm
                    font-medium

                    transition-all
                    duration-200
                  `,

                  isActive
                    ? `
                      bg-blue-600
                      text-white
                      shadow-lg
                      shadow-blue-200/50
                    `
                    : `
                      text-slate-600
                      hover:bg-white/80
                      hover:text-slate-900
                    `
                )}
              >
                <Icon
                  className={cn(
                    `
                      h-5
                      w-5

                      transition-transform
                      duration-200

                      group-hover:scale-110
                    `,
                    isActive
                      ? "text-white"
                      : "text-slate-500"
                  )}
                />

                <span>
                  {item.title}
                </span>
              </Link>
            );
          }
        )}
      </nav>

      {/* FOOTER */}

      <div
        className="
          mt-6

          rounded-3xl

          border
          border-white/30

          bg-white/60

          p-5

          shadow-lg
          shadow-slate-200/20
        "
      >
        <p className="text-sm font-medium text-slate-900">
          CampusX Platform
        </p>

        <p className="mt-2 text-xs leading-6 text-slate-500">
          Buy, sell, and connect with students on your campus.
        </p>
      </div>
    </aside>
  );
}
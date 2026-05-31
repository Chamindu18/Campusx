"use client";

/**
 * Admin sidebar.
 */

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

const links = [
  {
    label: "Dashboard",
    href: "/admin",
  },
  {
    label: "Users",
    href: "/admin/users",
  },
  {
    label: "Listings",
    href: "/admin/listings",
  },
  {
    label: "Dorms",
    href: "/admin/dorms",
  },
  {
    label: "Settings",
    href: "/admin/settings",
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
  },
  {
    label: "Logs",
    href: "/admin/logs",
  },
  {
    label: "System",
    href: "/admin/system",
  },
];

export function AdminSidebar() {
  const pathname =
    usePathname();

  return (
    <aside
      className="
        w-full
        lg:w-[280px]

        rounded-3xl

        border
        border-white/40

        bg-white/70

        p-5
        md:p-6

        shadow-lg
        shadow-slate-200/30

        backdrop-blur-xl
      "
    >
      <h2
        className="
          mb-6
          md:mb-8

          text-2xl
          md:text-3xl

          font-black

          text-slate-900
        "
      >
        Admin
      </h2>

      <nav className="space-y-3">
        {links.map(
          (
            link
          ) => {
            const active =
              link.href === "/admin"
                ? pathname ===
                  "/admin"
                : pathname.startsWith(
                    link.href
                  );

            return (
              <Link
                key={
                  link.href
                }
                href={
                  link.href
                }
                className={`
                  block

                  rounded-2xl

                  px-5
                  py-4

                  font-medium

                  transition-all
                  duration-200

                  ${
                    active
                      ? `
                        bg-slate-900
                        text-white
                        shadow-md
                      `
                      : `
                        text-slate-700
                        hover:bg-slate-100
                      `
                  }
                `}
              >
                {
                  link.label
                }
              </Link>
            );
          }
        )}
      </nav>
    </aside>
  );
}
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
    label:
      "Dashboard",

    href:
      "/admin",
  },

  {
    label:
      "Users",

    href:
      "/admin/users",
  },

  {
    label:
      "Listings",

    href:
      "/admin/listings",
  },

  {
    label:
      "Dorms",

    href:
      "/admin/dorms",
  },

  {
    label:
      "Settings",

    href:
      "/admin/settings",
  },

  {
    label:
      "Analytics",

    href:
      "/admin/analytics",
  },

  {
    label:
      "Logs",

    href:
      "/admin/logs",
  },

  {
    label:
      "System",

    href:
      "/admin/system",
  },
];

export function AdminSidebar() {
  const pathname =
    usePathname();

  return (
    <aside
      className="
        w-[280px]
        rounded-3xl
        bg-white/70
        p-6
        backdrop-blur
      "
    >
      <h2 className="mb-8 text-3xl font-black">
        Admin
      </h2>

      <nav className="space-y-3">
        {links.map(
          (
            link
          ) => {
            const active =
              pathname ===
              link.href;

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
                  transition

                  ${
                    active
                      ? "bg-slate-900 text-white"
                      : "hover:bg-slate-100"
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
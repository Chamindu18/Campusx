"use client";

/**
 * Admin sidebar.
 */

import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  LogOut,
  ShieldCheck,
} from "lucide-react";

import toast from "react-hot-toast";

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

  const router =
    useRouter();

  async function handleLogout() {
    try {
      const response =
        await fetch(
          "/api/auth/logout",
          {
            method: "POST",
          }
        );

      if (!response.ok) {
        throw new Error();
      }

      toast.success(
        "Logged out"
      );

      router.replace(
        "/login"
      );

      router.refresh();
    } catch {
      toast.error(
        "Logout failed"
      );
    }
  }

  return (
    <aside
      className="
        flex
        min-h-[70vh]
        w-full
        flex-col

        rounded-3xl

        border
        border-white/40

        bg-white/70

        p-5
        md:p-6

        shadow-lg
        shadow-slate-200/30

        backdrop-blur-xl

        lg:w-[280px]
      "
    >
      {/* HEADER */}

      <div>
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <ShieldCheck
            className="
              h-8
              w-8
              text-blue-600
            "
          />

          <div>
            <h2
              className="
                text-2xl
                font-black
                text-slate-900

                md:text-3xl
              "
            >
              Admin
            </h2>

            <p
              className="
                text-xs
                text-slate-500
              "
            >
              System Management
            </p>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}

      <nav
        className="
          mt-8
          space-y-3
        "
      >
        {links.map(
          (link) => {
            const active =
              link.href ===
              "/admin"
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
                {link.label}
              </Link>
            );
          }
        )}
      </nav>

      {/* LOGOUT */}

      <div className="mt-auto pt-8">
        <button
          type="button"
          aria-label="Logout"
          onClick={
            handleLogout
          }
          className="
            flex
            w-full
            items-center
            justify-center
            gap-3

            rounded-2xl

            bg-red-100

            px-5
            py-4

            font-medium

            text-red-600

            transition

            hover:bg-red-200
          "
        >
          <LogOut
            className="
              h-5
              w-5
            "
          />

          Logout
        </button>
      </div>
    </aside>
  );
}
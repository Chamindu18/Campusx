"use client";

/**
 * Platform topbar.
 */

import { useState } from "react";

import {
  LogOut,
  Menu,
  Search,
} from "lucide-react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { useCurrentUser } from "@/hooks/use-current-user";
import { NotificationBell } from "@/components/ui/NotificationBell";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({
  onMenuClick,
}: TopbarProps) {
  const { user, mutate } =
    useCurrentUser();

  const router =
    useRouter();

  const [
    isLoggingOut,
    setIsLoggingOut,
  ] = useState(false);

  async function handleLogout() {
    if (isLoggingOut) {
      return;
    }

    try {
      setIsLoggingOut(true);

      await fetch(
        "/api/auth/logout",
        {
          method: "POST",
        }
      );

      await mutate(
        null,
        false
      );

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
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <header
      className="
        sticky
        top-0
        z-30

        flex

        h-20
        md:h-24

        items-center
        justify-between

        border-b
        border-white/20

        bg-white/50

        px-4
        md:px-10

        backdrop-blur-xl
      "
    >
      {/* LEFT */}

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenuClick}
          className="
            flex

            h-12
            w-12

            items-center
            justify-center

            rounded-2xl

            bg-white/70

            text-slate-700

            transition

            hover:bg-white

            lg:hidden
          "
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* SEARCH */}

        <div
          className="
            hidden

            h-14
            w-full
            max-w-lg

            items-center
            gap-3

            rounded-2xl

            border
            border-slate-200

            bg-white/70

            px-5

            md:flex
          "
        >
          <Search className="h-5 w-5 text-slate-500" />

          <input
            aria-label="Search"
            placeholder="Search..."
            className="
              w-full

              bg-transparent

              text-sm

              outline-none

              placeholder:text-slate-400
            "
          />
        </div>
      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-3 md:gap-5">
        <NotificationBell />

        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden text-right md:block">
            <p
              className="
                text-sm
                font-semibold
                text-slate-900
              "
            >
              {user?.name ||
                "Loading..."}
            </p>

            <p
              className="
                max-w-[180px]
                truncate

                text-xs

                text-slate-500
              "
            >
              {user?.email}
            </p>
          </div>

          <div
            className="
              flex

              h-11
              w-11

              items-center
              justify-center

              rounded-2xl

              bg-blue-600

              text-sm
              font-bold
              text-white

              md:h-12
              md:w-12
            "
          >
            {user?.name
              ?.charAt(0)
              ?.toUpperCase() ||
              "U"}
          </div>

          <button
            type="button"
            aria-label="Logout"
            disabled={isLoggingOut}
            onClick={handleLogout}
            className="
              flex

              h-11
              w-11

              items-center
              justify-center

              rounded-2xl

              bg-red-100

              text-red-600

              transition

              hover:bg-red-200

              disabled:cursor-not-allowed
              disabled:opacity-50

              md:h-12
              md:w-12
            "
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
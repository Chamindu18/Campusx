"use client";

/**
 * Platform application layout.
 */

import {
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  usePathname,
} from "next/navigation";

import {
  Sidebar,
} from "@/components/layout/Sidebar";

import {
  Topbar,
} from "@/components/layout/Topbar";

interface PlatformLayoutProps {
  children: ReactNode;
}

export default function PlatformLayout({
  children,
}: PlatformLayoutProps) {
  const pathname =
    usePathname();

  const isAdmin =
    pathname.startsWith(
      "/admin"
    );

  const [
    sidebarOpen,
    setSidebarOpen,
  ] =
    useState(
      false
    );

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-slate-50
      "
    >
      {/* BACKGROUND */}

      {/*<AnimatedBackground />*/}

      {/* ADMIN */}

      {isAdmin ? (
        <div
          className="
            relative
            z-10

            p-4
            md:p-6
            lg:p-10
          "
        >
          {children}
        </div>
      ) : (
        <>
          {/* MOBILE OVERLAY */}

          {sidebarOpen && (
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() =>
                setSidebarOpen(
                  false
                )
              }
              className="
                fixed
                inset-0
                z-40

                bg-black/40

                backdrop-blur-sm

                lg:hidden
              "
            />
          )}

          {/* SIDEBAR */}

          <div
            className={`
              fixed
              left-0
              top-0
              z-50

              h-screen

              transition-transform
              duration-300

              ${
                sidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full"
              }

              lg:translate-x-0
            `}
          >
            <Sidebar />
          </div>

          {/* MAIN CONTENT */}

          <div
            className="
              min-h-screen

              lg:ml-[280px]
            "
          >
            <Topbar
              onMenuClick={() =>
                setSidebarOpen(
                  true
                )
              }
            />

            <div
              className="
                relative
                z-10

                p-4
                md:p-6
                lg:p-10
              "
            >
              {children}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
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

import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

import { Sidebar } from "@/components/layout/Sidebar";

import { Topbar } from "@/components/layout/Topbar";

interface PlatformLayoutProps {
  children: ReactNode;
}

export default function PlatformLayout({
  children,
}: PlatformLayoutProps) {
  /**
   * Mobile sidebar state.
   */
  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* BACKGROUND */}
      <AnimatedBackground />

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
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
          h-full
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

      {/* MAIN */}
      <div className="lg:ml-[280px]">
        {/* TOPBAR */}
        <Topbar
          onMenuClick={() =>
            setSidebarOpen(
              true
            )
          }
        />

        {/* PAGE CONTENT */}
        <div className="relative z-10 p-4 md:p-6 lg:p-10">
          {children}
        </div>
      </div>
    </main>
  );
}
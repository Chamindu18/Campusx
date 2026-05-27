"use client";

/**
 * Real authenticated profile page.
 */

import { motion } from "framer-motion";

import {
  Calendar,
  Mail,
  School,
} from "lucide-react";

import Link from "next/link";

import {
  useCurrentUser,
} from "@/hooks/use-current-user";

import {
  Card,
} from "@/components/ui/Card";

export default function ProfilePage() {
  const {
    user,
  } =
    useCurrentUser();

  /**
   * Loading.
   */
  if (!user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-lg text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* PROFILE */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          overflow-hidden
          rounded-[32px]
          border
          border-white/40
          bg-white/70
          shadow-xl
          shadow-slate-200/30
          backdrop-blur-xl
        "
      >
        {/* Banner */}

        <div
          className="
            h-48

            bg-gradient-to-br

            from-blue-500
            via-indigo-500
            to-cyan-500
          "
        />

        <div className="relative px-10 pb-10">
          {/* Avatar */}

          <div
            className="
              absolute
              -top-16

              flex
              h-32
              w-32

              items-center
              justify-center

              rounded-[28px]

              border-4
              border-white

              bg-white

              text-4xl
              font-black

              text-slate-900

              shadow-xl
            "
          >
            {user.name
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          {/* Content */}

          <div className="pt-24">
            <div className="flex flex-col gap-10 xl:flex-row xl:justify-between">
              <div>
                <h1 className="text-5xl font-black">
                  {user.name}
                </h1>

                <p className="mt-6 max-w-2xl text-lg text-slate-600">
                  {user.bio ||
                    "CampusX member"}
                </p>

                <div className="mt-8 flex flex-col gap-4 text-slate-500">
                  <div className="flex items-center gap-3">
                    <School />

                    <span>
                      {user.university ||
                        "University not added"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail />

                    <span>
                      {user.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar />

                    <span>
                      CampusX Member
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}

              <div className="grid grid-cols-2 gap-5">
                <Card className="border-white/40 bg-white/70 p-6 text-center backdrop-blur-xl">
                  <div className="text-4xl font-black">
                    —
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Marketplace
                  </p>
                </Card>

                <Card className="border-white/40 bg-white/70 p-6 text-center backdrop-blur-xl">
                  <div className="text-4xl font-black">
                    Active
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Account
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* DASHBOARD */}

      <div className="mt-16">
        <Card className="border-white/40 bg-white/70 p-10 backdrop-blur-xl">
          <h2 className="text-3xl font-black">
            Manage Content
          </h2>

          <p className="mt-4 text-slate-600">
            Manage listings,
            saved items,
            and dorms from dashboard.
          </p>

          <div className="mt-8">
            <Link
              href="/dashboard"
              className="
                inline-flex

                rounded-2xl

                bg-slate-900

                px-6
                py-3

                text-white
              "
            >
              Open Dashboard
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
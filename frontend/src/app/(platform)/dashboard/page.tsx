/**
 * Dashboard homepage.
 */

import Link from "next/link";

import {
  Building2,
  Home,
  MessageCircle,
  Plus,
  ShoppingBag,
} from "lucide-react";

import { Card } from "@/components/ui/Card";

export default function DashboardPage() {
  return (
    <div>
      {/* HEADER */}
      <div>
        <h1 className="text-5xl font-black tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Manage your marketplace listings, dorms, and student activity from one place.
        </p>
      </div>

      {/* STATS */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* Marketplace */}
        <Card
          className="
            border-white/40
            bg-white/70
            p-6
            backdrop-blur-xl
          "
        >
          <div className="flex items-center justify-between">
            <div
              className="
                rounded-2xl
                bg-blue-100
                p-3
              "
            >
              <ShoppingBag className="h-6 w-6 text-blue-700" />
            </div>

            <span className="text-sm font-medium text-slate-500">
              Marketplace
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-black text-slate-900">
            Items
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Buy and sell student products.
          </p>
        </Card>

        {/* Dorms */}
        <Card
          className="
            border-white/40
            bg-white/70
            p-6
            backdrop-blur-xl
          "
        >
          <div className="flex items-center justify-between">
            <div
              className="
                rounded-2xl
                bg-emerald-100
                p-3
              "
            >
              <Home className="h-6 w-6 text-emerald-700" />
            </div>

            <span className="text-sm font-medium text-slate-500">
              Housing
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-black text-slate-900">
            Dorms
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Manage student boarding listings.
          </p>
        </Card>

        {/* Messages */}
        <Card
          className="
            border-white/40
            bg-white/70
            p-6
            backdrop-blur-xl
          "
        >
          <div className="flex items-center justify-between">
            <div
              className="
                rounded-2xl
                bg-purple-100
                p-3
              "
            >
              <MessageCircle className="h-6 w-6 text-purple-700" />
            </div>

            <span className="text-sm font-medium text-slate-500">
              Communication
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-black text-slate-900">
            Chat
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Stay connected with students.
          </p>
        </Card>

        {/* Platform */}
        <Card
          className="
            border-white/40
            bg-white/70
            p-6
            backdrop-blur-xl
          "
        >
          <div className="flex items-center justify-between">
            <div
              className="
                rounded-2xl
                bg-orange-100
                p-3
              "
            >
              <Building2 className="h-6 w-6 text-orange-700" />
            </div>

            <span className="text-sm font-medium text-slate-500">
              CampusX
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-black text-slate-900">
            Platform
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Student marketplace ecosystem.
          </p>
        </Card>
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-14">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-900">
              Quick Actions
            </h2>

            <p className="mt-3 text-slate-500">
              Fast access to your most-used features.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* Create Listing */}
          <Link href="/create-listing">
            <Card
              className="
                group
                border-white/40
                bg-white/70
                p-8
                backdrop-blur-xl
                transition
                hover:-translate-y-1
              "
            >
              <div
                className="
                  inline-flex
                  rounded-2xl
                  bg-blue-100
                  p-4
                "
              >
                <Plus className="h-6 w-6 text-blue-700" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Create Listing
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Post marketplace products for students.
              </p>
            </Card>
          </Link>

          {/* Create Dorm */}
          <Link href="/create-dorm">
            <Card
              className="
                group
                border-white/40
                bg-white/70
                p-8
                backdrop-blur-xl
                transition
                hover:-translate-y-1
              "
            >
              <div
                className="
                  inline-flex
                  rounded-2xl
                  bg-emerald-100
                  p-4
                "
              >
                <Home className="h-6 w-6 text-emerald-700" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Create Dorm
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Add a student boarding listing.
              </p>
            </Card>
          </Link>

          {/* Marketplace */}
          <Link href="/marketplace">
            <Card
              className="
                group
                border-white/40
                bg-white/70
                p-8
                backdrop-blur-xl
                transition
                hover:-translate-y-1
              "
            >
              <div
                className="
                  inline-flex
                  rounded-2xl
                  bg-violet-100
                  p-4
                "
              >
                <ShoppingBag className="h-6 w-6 text-violet-700" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Marketplace
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Browse products posted by students.
              </p>
            </Card>
          </Link>

          {/* Messages */}
          <Link href="/messages">
            <Card
              className="
                group
                border-white/40
                bg-white/70
                p-8
                backdrop-blur-xl
                transition
                hover:-translate-y-1
              "
            >
              <div
                className="
                  inline-flex
                  rounded-2xl
                  bg-pink-100
                  p-4
                "
              >
                <MessageCircle className="h-6 w-6 text-pink-700" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Messages
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Continue your student conversations.
              </p>
            </Card>
          </Link>
        </div>
      </div>

      {/* PLATFORM SECTION */}
      <div className="mt-16">
        <Card
          className="
            overflow-hidden
            border-white/40
            bg-gradient-to-br
            from-blue-600
            via-indigo-600
            to-violet-700
            p-10
            text-white
          "
        >
          <div className="max-w-3xl">
            <h2 className="text-4xl font-black tracking-tight">
              CampusX Student Ecosystem
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/80">
              CampusX connects university students through marketplace trading,
              student housing, messaging, and campus-focused services in one platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/marketplace"
                className="
                  rounded-2xl
                  bg-white
                  px-6
                  py-4
                  text-sm
                  font-semibold
                  text-slate-900
                "
              >
                Explore Marketplace
              </Link>

              <Link
                href="/dorms"
                className="
                  rounded-2xl
                  border
                  border-white/30
                  bg-white/10
                  px-6
                  py-4
                  text-sm
                  font-semibold
                  text-white
                  backdrop-blur-xl
                "
              >
                Explore Dorms
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
"use client";

/**
 * Homepage hero section.
 */

import {
  useState,
} from "react";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import {
  ArrowRight,
  Search,
} from "lucide-react";

/**
 * Keywords that indicate
 * dorm/housing intent.
 */
const dormKeywords = [
  "dorm",
  "boarding",
  "hostel",
  "room",
  "rooms",
  "boarding house",
  "girls dorm",
  "boys dorm",
  "accommodation",
  "rent",
  "hostel room",
  "nsbm",
  "sliit",
  "ucsc",
  "mora",
  "moratuwa",
  "university",
];

/**
 * Detect dorm intent.
 */
function isDormSearch(
  query: string
) {
  const normalized =
    query.toLowerCase();

  return dormKeywords.some(
    (keyword) =>
      normalized.includes(
        keyword
      )
  );
}

export function HeroSection() {
  /**
   * Router.
   */
  const router =
    useRouter();

  /**
   * Search state.
   */
  const [search, setSearch] =
    useState("");

  /**
   * Smart search handler.
   */
  function handleSearch() {
    if (
      !search.trim()
    ) {
      return;
    }

    const encodedQuery =
      encodeURIComponent(
        search
      );

    /**
     * Route intelligently.
     */
    if (
      isDormSearch(
        search
      )
    ) {
      router.push(
        `/dorms?search=${encodedQuery}`
      );

      return;
    }

    /**
     * Default:
     * marketplace.
     */
    router.push(
      `/marketplace?search=${encodedQuery}`
    );
  }

  return (
    <section
      className="
        relative
        overflow-hidden
        px-6
        pb-24
        pt-32
        lg:px-12
        lg:pt-40
      "
    >
      {/* BACKGROUND GRADIENT */}
      <div
        className="
          absolute
          inset-0
          -z-10
          bg-gradient-to-br
          from-blue-50
          via-indigo-50
          to-violet-100
        "
      />

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          {/* BADGE */}
          <div
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-blue-200
              bg-white/80
              px-5
              py-3
              text-sm
              font-semibold
              text-blue-700
              shadow-lg
              shadow-blue-100/40
              backdrop-blur-xl
            "
          >
            🚀 Sri Lanka's Student Marketplace Platform
          </div>

          {/* TITLE */}
          <h1
            className="
              mt-8
              text-5xl
              font-black
              leading-[1.05]
              tracking-tight
              text-slate-900
              sm:text-6xl
              lg:text-7xl
            "
          >
            Buy, Sell & Find
            <span className="block text-blue-600">
              Everything For Campus Life
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              mt-8
              max-w-2xl
              text-lg
              leading-9
              text-slate-600
              sm:text-xl
            "
          >
            CampusX helps university students discover marketplace items,
            boarding places, dorms, study essentials, and student services
            across Sri Lanka.
          </p>

          {/* SEARCH */}
          <div
            className="
              mt-12
              rounded-[32px]
              border
              border-white/40
              bg-white/70
              p-4
              shadow-2xl
              shadow-slate-200/30
              backdrop-blur-xl
            "
          >
            <div
              className="
                flex
                flex-col
                gap-4
                lg:flex-row
              "
            >
              {/* INPUT */}
              <div
                className="
                  flex
                  h-16
                  flex-1
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                "
              >
                <Search className="h-5 w-5 text-slate-400" />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key ===
                      "Enter"
                    ) {
                      handleSearch();
                    }
                  }}
                  placeholder="Search dorms, laptops, books, gaming items..."
                  className="
                    w-full
                    bg-transparent
                    text-sm
                    outline-none
                    placeholder:text-slate-400
                  "
                />
              </div>

              {/* BUTTON */}
              <button
                onClick={
                  handleSearch
                }
                className="
                  inline-flex
                  h-16
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-blue-600
                  px-8
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-blue-700
                "
              >
                Search CampusX

                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* SUGGESTIONS */}
            <div className="mt-5 flex flex-wrap gap-3">
              {[
                "MacBook",
                "NSBM boarding",
                "Gaming chair",
                "Girls dorm",
                "Java books",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setSearch(
                      item
                    );

                    const encoded =
                      encodeURIComponent(
                        item
                      );

                    if (
                      isDormSearch(
                        item
                      )
                    ) {
                      router.push(
                        `/dorms?search=${encoded}`
                      );

                      return;
                    }

                    router.push(
                      `/marketplace?search=${encoded}`
                    );
                  }}
                  className="
                    rounded-full
                    bg-slate-100
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-slate-700
                    transition
                    hover:bg-slate-200
                  "
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/marketplace"
              className="
                inline-flex
                items-center
                justify-center
                rounded-2xl
                bg-slate-900
                px-8
                py-4
                text-sm
                font-semibold
                text-white
              "
            >
              Explore Marketplace
            </Link>

            <Link
              href="/dorms"
              className="
                inline-flex
                items-center
                justify-center
                rounded-2xl
                border
                border-slate-300
                bg-white/70
                px-8
                py-4
                text-sm
                font-semibold
                text-slate-900
                backdrop-blur-xl
              "
            >
              Find Student Dorms
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
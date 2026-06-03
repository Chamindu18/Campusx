"use client";

/**
 * Marketplace page.
 */

import {
  useEffect,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

import Link from "next/link";

import { MarketplaceCard } from "@/components/ui/MarketplaceCard";
import { MarketplaceCardSkeleton } from "@/components/ui/MarketplaceCardSkeleton";

import { useListings } from "@/hooks/use-listings";

import { MARKETPLACE_CATEGORIES } from "@/constants/listing-categories";

import type { Listing } from "@/hooks/use-listings";

export default function MarketplacePage() {
  const [search, setSearch] =
    useState("");

  const [
    debouncedSearch,
    setDebouncedSearch,
  ] =
    useState("");

  const [
    category,
    setCategory,
  ] =
    useState("All");

  const [
    page,
    setPage,
  ] =
    useState(1);

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setDebouncedSearch(
          search
        );
      }, 400);

    return () =>
      clearTimeout(timer);
  }, [search]);

  const {
    listings,
    pagination,
    isLoading,
  } =
    useListings({
      search:
        debouncedSearch,
      category,
      page,
    });

  const totalResults =
    pagination
      ?.totalListings ??
    listings.length;

  return (
    <div>
      {/* HEADER */}

      <div>
        <h1
          className="
            text-3xl
            font-black
            tracking-tight
            text-slate-900

            sm:text-4xl
            md:text-5xl
          "
        >
          Marketplace
        </h1>

        <p
          className="
            mt-4
            text-lg
            text-slate-600
          "
        >
          Discover listings
          from your campus
          community.
        </p>

        <p
          className="
            mt-3
            text-sm
            text-slate-500
          "
        >
          {totalResults} listings
          found
        </p>
      </div>

      {/* SEARCH */}

      <div
        className="
          mt-10

          flex
          flex-col

          gap-5
        "
      >
        <div
          className="
            flex

            h-14

            items-center

            gap-3

            rounded-2xl

            border
            border-white/40

            bg-white/70

            px-5

            backdrop-blur-xl
          "
        >
          <Search
            className="
              h-5
              w-5
              text-slate-400
            "
          />

          <input
            value={search}
            onChange={(
              e
            ) => {
              setSearch(
                e.target
                  .value
              );

              setPage(
                1
              );
            }}
            placeholder="Search listings..."
            className="
              w-full

              bg-transparent

              outline-none

              placeholder:text-slate-400
            "
          />
        </div>

        {/* CATEGORIES */}

        <div
          className="
            flex
            flex-wrap
            gap-3
          "
        >
          {MARKETPLACE_CATEGORIES.map(
            (
              item
            ) => (
              <button
                key={
                  item
                }
                type="button"
                onClick={() => {
                  setCategory(
                    item
                  );

                  setPage(
                    1
                  );
                }}
                className={
                  category ===
                  item
                    ? `
                      rounded-2xl
                      bg-blue-600
                      px-3
                      py-2
                      text-white
                      sm:px-5
                      sm:py-3
                    `
                    : `
                      rounded-2xl

                      border
                      border-white/40

                      bg-white/70

                      px-3
                      py-2

                      transition

                      hover:bg-white

                      sm:px-5
                      sm:py-3
                    `
                }
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      {/* LOADING */}

      {isLoading && (
        <div
          className="
            mt-12

            grid

            grid-cols-1

            gap-8

            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {Array.from({
            length: 6,
          }).map(
            (
              _,
              index
            ) => (
              <MarketplaceCardSkeleton
                key={
                  index
                }
              />
            )
          )}
        </div>
      )}

      {/* EMPTY */}

      {!isLoading &&
        listings.length ===
          0 && (
          <div
            className="
              mt-20

              rounded-3xl

              border
              border-dashed

              bg-white/50

              p-12
              md:p-16

              text-center
            "
          >
            <h2
              className="
                text-2xl
                font-black

                md:text-3xl
              "
            >
              No listings found
            </h2>

            <p
              className="
                mt-4
                text-slate-500
              "
            >
              Try changing your
              search or filters.
            </p>

            <Link
              href="/create-listing"
              className="
                mt-6

                inline-flex

                rounded-2xl

                bg-blue-600

                px-6
                py-3

                font-medium

                text-white
              "
            >
              Create Listing
            </Link>
          </div>
        )}

      {/* GRID */}

      {!isLoading &&
        listings.length >
          0 && (
          <div
            className="
              mt-12

              grid

              gap-8

              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {listings.map(
              (
                listing: Listing
              ) => (
                <MarketplaceCard
                  key={
                    listing.id
                  }
                  {...listing}
                />
              )
            )}
          </div>
        )}

      {/* PAGINATION */}

      {!isLoading &&
        pagination &&
        pagination
          .totalPages >
          1 && (
          <div
            className="
              mt-16

              flex

              items-center
              justify-center

              gap-4
            "
          >
            <button
              type="button"
              disabled={
                page ===
                1
              }
              onClick={() =>
                setPage(
                  (
                    previous
                  ) =>
                    previous -
                    1
                )
              }
              className="
                rounded-xl

                border

                p-3

                disabled:opacity-40
              "
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <span
              className="
                text-sm
                font-medium
              "
            >
              {page}
              {" / "}
              {
                pagination.totalPages
              }
            </span>

            <button
              type="button"
              disabled={
                page ===
                pagination.totalPages
              }
              onClick={() =>
                setPage(
                  (
                    previous
                  ) =>
                    previous +
                    1
                )
              }
              className="
                rounded-xl

                border

                p-3

                disabled:opacity-40
              "
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
    </div>
  );
}
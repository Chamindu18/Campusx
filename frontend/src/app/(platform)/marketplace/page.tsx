"use client";

/**
 * Advanced marketplace page.
 */

import { useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

import { MarketplaceCard } from "@/components/ui/MarketplaceCard";

import { MarketplaceCardSkeleton } from "@/components/ui/MarketplaceCardSkeleton";

import { useListings } from "@/hooks/use-listings";

const categories = [
  "All",
  "Books",
  "Electronics",
  "Gaming",
  "Furniture",
  "Accessories",
];

export default function MarketplacePage() {
  /**
   * Search state.
   */
  const [search, setSearch] =
    useState("");

  /**
   * Category state.
   */
  const [
    category,
    setCategory,
  ] = useState("All");

  /**
   * Pagination state.
   */
  const [page, setPage] =
    useState(1);

  /**
   * Fetch marketplace data.
   */
  const {
    listings,
    pagination,
    isLoading,
  } = useListings({
    search,
    category,
    page,
  });

  return (
    <div>
      {/* HEADER */}
      <div>
        <h1 className="text-5xl font-black tracking-tight text-slate-900">
          Marketplace
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Discover listings from your
          campus community.
        </p>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="mt-10 flex flex-col gap-5">
        {/* Search */}
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
          <Search className="h-5 w-5 text-slate-500" />

          <input
            value={search}
            onChange={(e) => {
              setSearch(
                e.target.value
              );

              setPage(1);
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

        {/* Categories */}
        <div className="flex flex-wrap gap-3">
          {categories.map(
            (item) => (
              <button
                key={item}
                onClick={() => {
                  setCategory(
                    item
                  );

                  setPage(1);
                }}
                className={`
                  rounded-2xl
                  px-5
                  py-3
                  text-sm
                  font-medium
                  transition
                  ${
                    category === item
                      ? `
                        bg-blue-600
                        text-white
                      `
                      : `
                        border
                        border-white/40
                        bg-white/70
                        text-slate-700
                        hover:bg-white
                      `
                  }
                `}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      {/* LOADING */}
      {isLoading && (
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <MarketplaceCardSkeleton
              key={index}
            />
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!isLoading &&
        listings.length === 0 && (
          <div
            className="
              mt-20
              rounded-[32px]
              border
              border-dashed
              border-slate-300
              bg-white/50
              p-16
              text-center
            "
          >
            <h2 className="text-3xl font-black text-slate-900">
              No listings found
            </h2>

            <p className="mt-4 text-slate-500">
              Try adjusting your search or category filters.
            </p>
          </div>
        )}

      {/* GRID */}
      {!isLoading &&
        listings.length > 0 && (
          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {listings.map(
              (listing) => (
                <MarketplaceCard
                  key={
                    listing.id
                  }
                  listing={
                    listing
                  }
                />
              )
            )}
          </div>
        )}

      {/* PAGINATION */}
      {!isLoading &&
        pagination &&
        pagination.totalPages >
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
            {/* Prev */}
            <button
              disabled={
                page === 1
              }
              onClick={() =>
                setPage(
                  (
                    prev
                  ) =>
                    prev - 1
                )
              }
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-white/40
                bg-white/70
                transition
                disabled:opacity-50
              "
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Page */}
            <div
              className="
                rounded-2xl
                bg-blue-600
                px-6
                py-3
                text-sm
                font-semibold
                text-white
              "
            >
              Page {page} of{" "}
              {
                pagination.totalPages
              }
            </div>

            {/* Next */}
            <button
              disabled={
                page ===
                pagination.totalPages
              }
              onClick={() =>
                setPage(
                  (
                    prev
                  ) =>
                    prev + 1
                )
              }
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-white/40
                bg-white/70
                transition
                disabled:opacity-50
              "
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
    </div>
  );
}
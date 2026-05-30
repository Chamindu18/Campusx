"use client";

/**
 * Saved listings page.
 */

import toast from "react-hot-toast";

import {
  Trash2,
} from "lucide-react";

import {
  useSavedListings,
} from "@/hooks/use-saved-listings";

import {
  MarketplaceCard,
} from "@/components/ui/MarketplaceCard";

/* ===================================================== */
/* TYPES */
/* ===================================================== */

interface SavedListing {
  id: string;

  listing: {
    id: string;

    title: string;

    category: string;

    price: number;

    condition: string;

    location: string;

    imageUrls: string[];
  };
}

/* ===================================================== */
/* PAGE */
/* ===================================================== */

export default function SavedPage() {
  /**
   * Saved listings.
   */
  const {
    savedListings,
    mutate,
    isLoading,
  } =
    useSavedListings();

  /* ===================================================== */
  /* REMOVE SAVED */
  /* ===================================================== */

  async function handleRemove(
    id: string
  ) {
    try {
      const response =
        await fetch(
          `/api/saved-listings/${id}`,
          {
            method:
              "DELETE",
          }
        );

      const result =
        await response.json();

      if (
        !response.ok
      ) {
        toast.error(
          result.error
        );

        return;
      }

      toast.success(
        "Removed from saved"
      );

      mutate();
    } catch (
      error: unknown
    ) {
      console.error(
        error
      );

      toast.error(
        "Failed to remove"
      );
    }
  }

  /* ===================================================== */
  /* LOADING */
  /* ===================================================== */

  if (
    isLoading
  ) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          Loading saved listings...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}

      <div>
        <h1 className="text-5xl font-black tracking-tight text-slate-900">
          Saved Listings
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Your wishlist and bookmarked
          marketplace items.
        </p>
      </div>

      {/* EMPTY */}

      {savedListings.length ===
        0 && (
        <div
          className="
            mt-16
            rounded-3xl
            border
            border-dashed
            border-slate-300
            bg-white/50
            px-10
            py-24
            text-center
            backdrop-blur-xl
          "
        >
          <h3 className="text-3xl font-bold text-slate-900">
            No saved listings
          </h3>

          <p className="mt-4 text-slate-500">
            Save listings from the marketplace.
          </p>
        </div>
      )}

      {/* GRID */}

      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {savedListings.map(
          (
            saved:
              SavedListing
          ) => (
            <div
              key={
                saved.id
              }
              className="relative"
            >
              {/* REMOVE */}

              <button
                onClick={() =>
                  handleRemove(
                    saved.id
                  )
                }
                className="
                  absolute
                  right-4
                  top-4
                  z-30
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
                "
              >
                <Trash2 className="h-5 w-5" />
              </button>

              <MarketplaceCard
                id={
                  saved
                    .listing
                    .id
                }
                title={
                  saved
                    .listing
                    .title
                }
                category={
                  saved
                    .listing
                    .category
                }
                price={
                  saved
                    .listing
                    .price
                }
                condition={
                  saved
                    .listing
                    .condition
                }
                location={
                  saved
                    .listing
                    .location
                }
                imageUrls={
                  saved
                    .listing
                    .imageUrls
                }
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}
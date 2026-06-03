"use client";

/**
 * Saved listings page.
 */

import Link from "next/link";

import toast from "react-hot-toast";

import {
  Heart,
  Trash2,
} from "lucide-react";

import {
  useSavedListings,
} from "@/hooks/use-saved-listings";

import {
  MarketplaceCard,
} from "@/components/ui/MarketplaceCard";

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

export default function SavedPage() {
  const {
    savedListings,
    mutate,
    isLoading,
  } =
    useSavedListings();

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
          result.error ??
            "Failed to remove listing"
        );

        return;
      }

      toast.success(
        "Removed from saved"
      );

      await mutate();
    } catch (
      error
    ) {
      console.error(
        error
      );

      toast.error(
        "Failed to remove listing"
      );
    }
  }

  if (
    isLoading
  ) {
    return (
      <div
        className="
          flex
          h-[60vh]
          items-center
          justify-center
        "
      >
        <p
          className="
            text-slate-500
          "
        >
          Loading saved listings...
        </p>
      </div>
    );
  }

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
          Saved Listings
        </h1>

        <p
          className="
            mt-4
            text-lg
            text-slate-600
          "
        >
          Your wishlist and bookmarked
          marketplace items.
        </p>

        <p
          className="
            mt-3
            text-sm
            text-slate-500
          "
        >
          {savedListings.length} saved
          {savedListings.length ===
          1
            ? " listing"
            : " listings"}
        </p>
      </div>

      {/* EMPTY STATE */}

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

            px-6
            py-16

            text-center

            backdrop-blur-xl

            md:px-10
            md:py-24
          "
        >
          <Heart
            className="
              mx-auto
              h-12
              w-12
              text-slate-400
            "
          />

          <h3
            className="
              mt-6
              text-2xl
              font-bold
              text-slate-900

              md:text-3xl
            "
          >
            No saved listings
          </h3>

          <p
            className="
              mt-4
              text-slate-500
            "
          >
            Save listings from the
            marketplace to access
            them quickly later.
          </p>

          <Link
            href="/marketplace"
            className="
              mt-8

              inline-flex

              rounded-2xl

              bg-blue-600

              px-6
              py-3

              font-medium

              text-white

              transition

              hover:bg-blue-700
            "
          >
            Browse Marketplace
          </Link>
        </div>
      )}

      {/* GRID */}

      {savedListings.length >
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
          {savedListings.map(
            (
              saved: SavedListing
            ) => (
              <div
                key={saved.id}
                className="
                  relative
                "
              >
                <button
                  type="button"
                  aria-label="Remove saved listing"
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
                      .listing.id
                  }
                  title={
                    saved
                      .listing.title
                  }
                  category={
                    saved
                      .listing
                        .category
                  }
                  price={
                    saved
                      .listing.price
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
      )}
    </div>
  );
}
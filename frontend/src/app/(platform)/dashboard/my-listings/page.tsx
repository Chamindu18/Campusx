"use client";

/**
 * User listings management page.
 */

import Link from "next/link";

import useSWR from "swr";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import toast from "react-hot-toast";

/* ===================================================== */
/* TYPES */
/* ===================================================== */

interface Listing {
  id: string;

  title: string;

  category: string;

  price: number;
}

interface ListingsResponse {
  listings: Listing[];
}

/* ===================================================== */
/* FETCHER */
/* ===================================================== */

const fetcher = async (
  url: string
): Promise<ListingsResponse> => {
  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch"
    );
  }

  return response.json();
};

/* ===================================================== */
/* PAGE */
/* ===================================================== */

export default function MyListingsPage() {
  /**
   * Listings.
   */
  const {
    data,
    mutate,
  } = useSWR(
    "/api/my-listings",
    fetcher
  );

  const listings =
    data?.listings || [];

  /* ===================================================== */
  /* DELETE LISTING */
  /* ===================================================== */

  async function handleDelete(
    id: string
  ) {
    const confirmed =
      confirm(
        "Delete this listing?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `/api/listings/${id}`,
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
        "Listing deleted"
      );

      mutate();
    } catch (
      error: unknown
    ) {
      console.error(
        error
      );

      toast.error(
        "Failed to delete listing"
      );
    }
  }

  return (
    <div>
      {/* HEADER */}

      <div className="flex items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            My Listings
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Manage your marketplace inventory.
          </p>
        </div>

        <Link
          href="/create-listing"
          className="
            rounded-2xl
            bg-blue-600
            px-6
            py-4
            text-sm
            font-semibold
            text-white
          "
        >
          Create Listing
        </Link>
      </div>

      {/* LISTINGS */}

      <div className="mt-12 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {listings.map(
          (
            listing
          ) => (
            <div
              key={
                listing.id
              }
              className="
                rounded-3xl
                border
                border-white/40
                bg-white/70
                p-6
                backdrop-blur-xl
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div
                    className="
                      inline-flex
                      rounded-full
                      bg-blue-100
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-blue-700
                    "
                  >
                    {
                      listing.category
                    }
                  </div>

                  <h2 className="mt-4 text-2xl font-bold text-slate-900">
                    {
                      listing.title
                    }
                  </h2>

                  <p className="mt-4 text-slate-500">
                    $
                    {listing.price.toFixed(
                      2
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Link
                  href={`/marketplace/edit/${listing.id}`}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  <Pencil className="h-4 w-4" />

                  Edit
                </Link>

                <button
                  onClick={() =>
                    handleDelete(
                      listing.id
                    )
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-red-600
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  <Trash2 className="h-4 w-4" />

                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
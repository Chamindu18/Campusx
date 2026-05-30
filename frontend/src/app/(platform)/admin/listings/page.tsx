"use client";

/**
 * Admin listings moderation.
 */

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import toast from "react-hot-toast";

interface Listing {
  id: string;

  title: string;

  price: number;

  category: string;

  createdAt: string;

  user: {
    id: string;

    name: string;
  };
}

export default function AdminListingsPage() {
  const [
    listings,
    setListings,
  ] =
    useState<
      Listing[]
    >([]);

  const [
    loading,
    setLoading,
  ] =
    useState(
      true
    );

  const [
    search,
    setSearch,
  ] =
    useState("");

  async function fetchListings() {
    try {
      setLoading(
        true
      );

      const response =
        await fetch(
          "/api/admin/listings"
        );

      if (
        !response.ok
      ) {
        throw new Error();
      }

      const data =
        await response.json();

      setListings(
        data
      );
    } catch {
      toast.error(
        "Failed to load listings"
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  async function removeListing(
    id: string
  ) {
    if (
      !confirm(
        "Delete listing?"
      )
    ) {
      return;
    }

    try {
      const response =
        await fetch(
          `/api/admin/listings/${id}`,
          {
            method:
              "DELETE",
          }
        );

      if (
        !response.ok
      ) {
        throw new Error();
      }

      toast.success(
        "Listing removed"
      );

      fetchListings();
    } catch {
      toast.error(
        "Failed to remove listing"
      );
    }
  }

  useEffect(() => {
    fetchListings();
  }, []);

  const filtered =
    useMemo(
      () =>
        listings.filter(
          (
            listing
          ) =>
            listing.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        ),

      [
        listings,
        search,
      ]
    );

  if (
    loading
  ) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Loading listings...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black sm:text-4xl md:text-5xl">
          Listings
        </h1>

        <p className="mt-3 text-slate-600">
          Moderate marketplace
        </p>
      </div>

      <input
        value={
          search
        }
        onChange={(
          e
        ) =>
          setSearch(
            e.target
              .value
          )
        }
        placeholder="Search listings..."
        className="
          h-12
          w-full
          rounded-2xl
          border
          px-5
        "
      />

      <div className="grid gap-6">
        {filtered.map(
          (
            listing
          ) => (
            <div
              key={
                listing.id
              }
              className="
                rounded-3xl
                bg-white/70
                p-8
              "
            >
              <h2 className="text-2xl font-black">
                {
                  listing.title
                }
              </h2>

              <p className="mt-2 text-slate-500">
                Owner:
                {" "}
                {
                  listing
                    .user
                    .name
                }
              </p>

              <div className="mt-5 flex gap-3">
                <span>
                  Rs.
                  {
                    listing.price
                  }
                </span>

                <span>
                  {
                    listing.category
                  }
                </span>
              </div>

              <div className="mt-8 flex gap-4">
                <Link
                  href={`/marketplace/${listing.id}`}
                  className="
                    rounded-2xl
                    border
                    px-5
                    py-3
                  "
                >
                  View
                </Link>

                <button
                  onClick={() =>
                    removeListing(
                      listing.id
                    )
                  }
                  className="
                    rounded-2xl
                    bg-red-600
                    px-5
                    py-3
                    text-white
                  "
                >
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
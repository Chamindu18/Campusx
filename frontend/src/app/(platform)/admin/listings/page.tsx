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
  ] = useState<Listing[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState("");

  async function fetchListings() {
    try {
      setLoading(true);
      setError(false);

      const response =
        await fetch(
          "/api/admin/listings"
        );

      if (!response.ok) {
        throw new Error();
      }

      const data =
        await response.json();

      setListings(data);
    } catch {
      setError(true);

      toast.error(
        "Failed to load listings"
      );
    } finally {
      setLoading(false);
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

      if (!response.ok) {
        throw new Error();
      }

      setListings((prev) =>
        prev.filter(
          (listing) =>
            listing.id !== id
        )
      );

      toast.success(
        "Listing removed"
      );
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
          (listing) =>
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

  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({
          length: 4,
        }).map((_, i) => (
          <div
            key={i}
            className="
              h-44
              animate-pulse
              rounded-3xl
              bg-white/70
            "
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          rounded-3xl
          bg-white/70
          p-6
        "
      >
        <h2
          className="
            text-xl
            font-bold
            text-red-600
          "
        >
          Failed to load listings
        </h2>

        <button
          onClick={
            fetchListings
          }
          className="
            mt-4
            rounded-2xl
            bg-blue-600
            px-5
            py-3
            text-white
          "
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      className="
        space-y-8
        md:space-y-10
      "
    >
      {/* HEADER */}

      <div>
        <h1
          className="
            text-3xl
            font-black
            sm:text-4xl
            md:text-5xl
          "
        >
          Listings
        </h1>

        <p
          className="
            mt-3
            text-slate-600
          "
        >
          Moderate marketplace
        </p>
      </div>

      {/* SEARCH */}

      <input
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        placeholder="Search listings..."
        className="
          h-12
          w-full
          rounded-2xl
          border
          border-slate-200
          px-5
        "
      />

      {/* EMPTY */}

      {filtered.length ===
        0 && (
        <div
          className="
            rounded-3xl
            bg-white/70
            p-8
            text-center
          "
        >
          No listings found.
        </div>
      )}

      {/* LIST */}

      <div className="grid gap-6">
        {filtered.map(
          (listing) => (
            <div
              key={
                listing.id
              }
              className="
                rounded-3xl
                bg-white/70
                p-5
                md:p-8
              "
            >
              <h2
                className="
                  text-xl
                  font-black
                  md:text-2xl
                "
              >
                {
                  listing.title
                }
              </h2>

              <p
                className="
                  mt-2
                  text-slate-500
                "
              >
                Owner:{" "}
                {
                  listing
                    .user.name
                }
              </p>

              <div
                className="
                  mt-5

                  flex
                  flex-col
                  gap-2

                  text-sm
                  text-slate-600

                  sm:flex-row
                  sm:flex-wrap
                  sm:gap-4
                "
              >
                <span>
                  Rs.{" "}
                  {listing.price.toLocaleString()}
                </span>

                <span>
                  {
                    listing.category
                  }
                </span>
              </div>

              <div
                className="
                  mt-8

                  flex
                  flex-col
                  gap-3

                  sm:flex-row
                "
              >
                <Link
                  href={`/marketplace/${listing.id}`}
                  className="
                    rounded-2xl
                    border
                    px-5
                    py-3
                    text-center
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
"use client";

/**
 * Public user profile page.
 */

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import Link from "next/link";

import { Card } from "@/components/ui/Card";

interface Listing {
  id: string;

  title: string;

  price: number;

  imageUrls?: string[];
}

interface Dorm {
  id: string;

  title: string;

  imageUrls?: string[];
}

interface UserProfile {
  id: string;

  name: string;

  university:
    string | null;

  bio:
    string | null;

  createdAt: string;

  listings:
    Listing[];

  dorms:
    Dorm[];

  _count: {
    listings: number;

    dorms: number;
  };
}

export default function UserProfilePage() {
  const params =
    useParams();

  const userId =
    params.id as string;

  const [
    user,
    setUser,
  ] =
    useState<UserProfile | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  /* ===================================================== */
  /* FETCH USER */
  /* ===================================================== */

  useEffect(() => {
    async function fetchUser() {
      try {
        const response =
          await fetch(
            `/api/users/${userId}`
          );

        const data =
          await response.json();

        setUser(
          data
        );
      } catch (
        error
      ) {
        console.error(
          error
        );
      } finally {
        setLoading(
          false
        );
      }
    }

    if (
      userId
    ) {
      fetchUser();
    }
  }, [userId]);

  /* ===================================================== */
  /* LOADING */
  /* ===================================================== */

  if (
    loading
  ) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  /* ===================================================== */
  /* NOT FOUND */
  /* ===================================================== */

  if (!user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          User not found
        </p>
      </div>
    );
  }

  const initials =
    user.name
      ?.split(" ")
      .map((word) =>
        word[0]?.toUpperCase()
      )
      .slice(0, 2)
      .join("") || "U";

  const joinedDate =
    new Date(
      user.createdAt
    ).toLocaleDateString(
      "en-US",
      {
        month: "long",
        year: "numeric",
      }
    );

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* HERO */}

      <Card className="overflow-hidden">
        <div
          className="
            bg-gradient-to-r
            from-blue-600
            via-indigo-600
            to-purple-600
            px-8
            py-14
            text-white
          "
        >
          <div className="flex flex-col items-center text-center">
            <div
              className="
                flex
                h-32
                w-32
                items-center
                justify-center
                rounded-full
                border-4
                border-white/30
                bg-white/20
                text-4xl
                font-black
                backdrop-blur
              "
            >
              {initials}
            </div>

            <h1 className="mt-6 text-5xl font-black">
              {user.name}
            </h1>

            <div
              className="
                mt-4
                rounded-full
                bg-white/20
                px-4
                py-2
                text-sm
                font-semibold
                backdrop-blur
              "
            >
              {user.university ||
                "University not specified"}
            </div>

            <p className="mt-4 text-white/80">
              Member since{" "}
              {joinedDate}
            </p>
          </div>
        </div>
      </Card>

      {/* STATS */}

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6 text-center">
          <h3 className="text-sm font-semibold text-slate-500">
            Marketplace Listings
          </h3>

          <p className="mt-3 text-4xl font-black text-blue-600">
            {
              user._count
                .listings
            }
          </p>
        </Card>

        <Card className="p-6 text-center">
          <h3 className="text-sm font-semibold text-slate-500">
            Dorm Listings
          </h3>

          <p className="mt-3 text-4xl font-black text-indigo-600">
            {
              user._count
                .dorms
            }
          </p>
        </Card>

        <Card className="p-6 text-center">
          <h3 className="text-sm font-semibold text-slate-500">
            Status
          </h3>

          <p className="mt-3 text-lg font-bold text-green-600">
            Active Member
          </p>
        </Card>
      </div>

      {/* ABOUT */}

      <Card className="p-8">
        <h2 className="text-2xl font-black text-slate-900">
          About
        </h2>

        <p className="mt-6 leading-relaxed text-slate-600">
          {user.bio?.trim()
            ? user.bio
            : "This user has not added a bio yet."}
        </p>
      </Card>

      {/* LISTINGS */}

      <div>
        <h2 className="text-3xl font-black text-slate-900">
          Recent Listings
        </h2>

        {user.listings.length ===
        0 ? (
          <Card className="mt-6 p-8 text-center">
            <p className="text-slate-500">
              No listings yet.
            </p>
          </Card>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {user.listings.map(
              (
                listing
              ) => (
                <Link
                  key={
                    listing.id
                  }
                  href={`/marketplace/${listing.id}`}
                >
                  <Card className="p-6 transition hover:-translate-y-1 hover:shadow-lg">
                    <h3 className="text-xl font-bold text-slate-900">
                      {
                        listing.title
                      }
                    </h3>

                    <p className="mt-3 text-slate-500">
                      LKR{" "}
                      {listing.price.toLocaleString()}
                    </p>
                  </Card>
                </Link>
              )
            )}
          </div>
        )}
      </div>

      {/* DORMS */}

      <div>
        <h2 className="text-3xl font-black text-slate-900">
          Recent Dorms
        </h2>

        {user.dorms.length ===
        0 ? (
          <Card className="mt-6 p-8 text-center">
            <p className="text-slate-500">
              No dorm listings yet.
            </p>
          </Card>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {user.dorms.map(
              (
                dorm
              ) => (
                <Link
                  key={
                    dorm.id
                  }
                  href={`/dorms/${dorm.id}`}
                >
                  <Card className="p-6 transition hover:-translate-y-1 hover:shadow-lg">
                    <h3 className="text-xl font-bold text-slate-900">
                      {
                        dorm.title
                      }
                    </h3>
                  </Card>
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
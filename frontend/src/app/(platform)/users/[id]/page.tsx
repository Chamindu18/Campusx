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

interface Listing {
  id: string;

  title: string;

  price: number;
}

interface Dorm {
  id: string;

  title: string;
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
        Loading profile...
      </div>
    );
  }

  /* ===================================================== */
  /* NOT FOUND */
  /* ===================================================== */

  if (!user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        User not found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      {/* PROFILE */}

      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="text-5xl font-black text-slate-900">
          {user.name}
        </h1>

        {user.university && (
          <p className="mt-4 text-lg text-slate-500">
            {
              user.university
            }
          </p>
        )}

        {user.bio && (
          <p className="mt-6 leading-8 text-slate-600">
            {user.bio}
          </p>
        )}

        <div className="mt-8 flex gap-8">
          <div>
            <p className="text-3xl font-black">
              {
                user._count
                  .listings
              }
            </p>

            <p className="text-slate-500">
              Listings
            </p>
          </div>

          <div>
            <p className="text-3xl font-black">
              {
                user._count
                  .dorms
              }
            </p>

            <p className="text-slate-500">
              Dorms
            </p>
          </div>
        </div>
      </div>

      {/* LISTINGS */}

      <div className="mt-14">
        <h2 className="text-3xl font-black">
          Listings
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {user.listings.map(
            (
              listing
            ) => (
              <Link
                key={
                  listing.id
                }
                href={`/marketplace/${listing.id}`}
                className="
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  transition
                  hover:shadow-md
                "
              >
                <h3 className="text-xl font-bold">
                  {
                    listing.title
                  }
                </h3>

                <p className="mt-3 text-slate-500">
                  Rs.
                  {
                    listing.price
                  }
                </p>
              </Link>
            )
          )}
        </div>
      </div>

      {/* DORMS */}

      <div className="mt-14">
        <h2 className="text-3xl font-black">
          Dorms
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {user.dorms.map(
            (
              dorm
            ) => (
              <Link
                key={
                  dorm.id
                }
                href={`/dorms/${dorm.id}`}
                className="
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  transition
                  hover:shadow-md
                "
              >
                <h3 className="text-xl font-bold">
                  {
                    dorm.title
                  }
                </h3>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
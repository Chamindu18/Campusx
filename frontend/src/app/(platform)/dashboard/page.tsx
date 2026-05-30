"use client";

import Link from "next/link";

import {
  Heart,
  Home,
  MessageCircle,
  Plus,
  ShoppingBag,
} from "lucide-react";

import useSWR from "swr";

import {
  Card,
} from "@/components/ui/Card";

import {
  useSavedListings,
} from "@/hooks/use-saved-listings";

import {
  useMyListings,
} from "@/hooks/use-my-listings";

import {
  useCurrentUser,
} from "@/hooks/use-current-user";

/* ===================================================== */
/* TYPES */
/* ===================================================== */

interface Listing {
  id: string;

  title: string;

  price: number;
}

interface Dorm {
  id: string;

  title: string;

  university: string;

  price: number;
}

interface SavedListing {
  id: string;

  listingId: string;

  listing?: {
    title: string;

    category: string;
  };
}

interface DormResponse {
  dorms: Dorm[];
}

/* ===================================================== */
/* QUICK ACTIONS */
/* ===================================================== */

const quickActions = [
  {
    title:
      "Create Listing",

    subtitle:
      "Post marketplace products",

    href:
      "/create-listing",

    icon:
      Plus,

    color:
      "bg-blue-100 text-blue-700",
  },

  {
    title:
      "Create Dorm",

    subtitle:
      "Add accommodation",

    href:
      "/create-dorm",

    icon:
      Home,

    color:
      "bg-emerald-100 text-emerald-700",
  },

  {
    title:
      "Marketplace",

    subtitle:
      "Continue browsing",

    href:
      "/marketplace",

    icon:
      ShoppingBag,

    color:
      "bg-violet-100 text-violet-700",
  },

  {
    title:
      "Messages",

    subtitle:
      "Continue conversations",

    href:
      "/messages",

    icon:
      MessageCircle,

    color:
      "bg-pink-100 text-pink-700",
  },
];

/* ===================================================== */
/* FETCHER */
/* ===================================================== */

const fetcher = async (
  url: string
): Promise<DormResponse> => {
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

export default function DashboardPage() {
  const {
    savedListings,
    isLoading:
      savedLoading,
  } =
    useSavedListings();

  const {
    listings,
    isLoading:
      listingsLoading,
  } =
    useMyListings();

  const {
    user,
    isLoading:
      userLoading,
  } =
    useCurrentUser();

  const username =
    user?.name ||
    user?.email?.split(
      "@"
    )[0] ||
    "Student";

  const {
    data:
      dormData,
  } =
    useSWR(
      "/api/my-dorms",
      fetcher
    );

  const dorms =
    dormData?.dorms ||
    [];

  return (
    <div className="space-y-14">
      {/* HERO */}

      <Card className="rounded-[36px] p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-medium text-blue-600">
              Dashboard
            </p>

            <h1 className="mt-4 text-5xl font-black tracking-tight">
              Welcome,
              {" "}

              <span className="text-blue-600">
                {userLoading
                  ? "..."
                  : username}
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Continue your student journey.
            </p>
          </div>

          <Link
            href="/marketplace"
            className="
              rounded-2xl
              bg-slate-900
              px-8
              py-4
              text-white
            "
          >
            Explore
          </Link>
        </div>
      </Card>

      {/* QUICK ACTIONS */}

      <section>
        <h2 className="text-3xl font-black">
          Quick Actions
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {quickActions.map(
            (
              action
            ) => {
              const Icon =
                action.icon;

              return (
                <Link
                  key={
                    action.href
                  }
                  href={
                    action.href
                  }
                >
                  <Card className="h-full rounded-[30px] p-8 transition hover:-translate-y-1">
                    <div
                      className={`
                        inline-flex
                        rounded-2xl
                        p-4
                        ${action.color}
                      `}
                    >
                      <Icon />
                    </div>

                    <h3 className="mt-7 text-2xl font-bold">
                      {
                        action.title
                      }
                    </h3>

                    <p className="mt-3 text-slate-500">
                      {
                        action.subtitle
                      }
                    </p>
                  </Card>
                </Link>
              );
            }
          )}
        </div>
      </section>

      {/* MY LISTINGS */}

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black">
            My Listings
            {" "}
            (
            {listings.length}
            )
          </h2>

          <Link
            href="/dashboard/my-listings"
            className="font-medium text-blue-600"
          >
            View All →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {listingsLoading ? (
            <Card className="p-8">
              Loading...
            </Card>
          ) : listings.length ? (
            listings
              .slice(
                0,
                4
              )
              .map(
                (
                  listing: Listing
                ) => (
                  <Card
                    key={
                      listing.id
                    }
                    className="
                      rounded-[30px]
                      p-8
                      transition
                      hover:-translate-y-1
                      hover:shadow-md
                    "
                  >
                    <div className="flex justify-between gap-6">
                      <div>
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
                      </div>

                      <div
                        className="
                          rounded-full
                          bg-blue-50
                          px-4
                          py-2
                          text-sm
                          font-medium
                          text-blue-700
                        "
                      >
                        Listing
                      </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                      <Link
                        href={`/marketplace/${listing.id}`}
                      >
                        <button
                          className="
                            rounded-full
                            border
                            px-5
                            py-2
                            font-medium
                            transition
                            hover:bg-slate-100
                          "
                        >
                          Open
                        </button>
                      </Link>

                      <Link
                        href={`/marketplace/edit/${listing.id}`}
                      >
                        <button
                          className="
                            rounded-full
                            bg-blue-600
                            px-5
                            py-2
                            font-medium
                            text-white
                            transition
                            hover:bg-blue-700
                          "
                        >
                          Edit
                        </button>
                      </Link>
                    </div>
                  </Card>
                )
              )
          ) : (
            <Card className="p-8">
              No listings yet.
            </Card>
          )}
        </div>
      </section>

      {/* MY DORMS */}

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black">
            My Dorms
            {" "}
            (
            {dorms.length}
            )
          </h2>

          <Link
            href="/dashboard/my-dorms"
            className="font-medium text-blue-600"
          >
            View All →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {dorms
            .slice(
              0,
              4
            )
            .map(
              (
                dorm: Dorm
              ) => (
                <Card
                  key={
                    dorm.id
                  }
                  className="
                    rounded-[30px]
                    p-8
                    transition
                    hover:-translate-y-1
                  "
                >
                  <div className="flex justify-between gap-4">
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
                        <Home
                          className="
                            mr-2
                            h-3
                            w-3
                          "
                        />

                        {
                          dorm.university
                        }
                      </div>

                      <h3 className="mt-5 text-2xl font-bold">
                        {
                          dorm.title
                        }
                      </h3>

                      <p className="mt-3 text-slate-500">
                        LKR{" "}
                        {dorm.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <Link
                      href={`/dorms/${dorm.id}`}
                    >
                      <button
                        className="
                          rounded-full
                          border
                          px-5
                          py-2
                          font-medium
                          hover:bg-slate-100
                        "
                      >
                        Open
                      </button>
                    </Link>

                    <Link
                      href={`/dorms/edit/${dorm.id}`}
                    >
                      <button
                        className="
                          rounded-full
                          bg-blue-600
                          px-5
                          py-2
                          font-medium
                          text-white
                        "
                      >
                        Edit
                      </button>
                    </Link>
                  </div>
                </Card>
              )
            )}
        </div>
      </section>

      {/* SAVED */}

      <section>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="text-red-500" />

            <h2 className="text-3xl font-black">
              Saved Listings (
              {savedListings.length}
              )
            </h2>
          </div>

          <Link
            href="/dashboard/saved"
            className="font-medium text-blue-600"
          >
            View All →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {savedLoading ? (
            <Card className="p-8">
              Loading...
            </Card>
          ) : savedListings.length ? (
            savedListings
              .slice(
                0,
                4
              )
              .map(
                (
                  item: SavedListing
                ) => (
                  <Card
                    key={
                      item.id
                    }
                    className="
                      rounded-[30px]
                      p-8
                      transition
                      hover:-translate-y-1
                      hover:shadow-md
                    "
                  >
                    <h3 className="text-xl font-bold">
                      {
                        item
                          .listing
                          ?.title
                      }
                    </h3>

                    <p className="mt-3 text-slate-500">
                      {
                        item
                          .listing
                          ?.category
                      }
                    </p>

                    <div className="mt-8 flex gap-3">
                      <Link
                        href={`/marketplace/${item.listingId}`}
                      >
                        <button
                          className="
                            rounded-full
                            border
                            px-5
                            py-2
                            font-medium
                            transition
                            hover:bg-slate-100
                          "
                        >
                          Open
                        </button>
                      </Link>

                      <button
                        onClick={async () => {
                          const response =
                            await fetch(
                              "/api/saved-listings",
                              {
                                method:
                                  "DELETE",

                                headers:
                                  {
                                    "Content-Type":
                                      "application/json",
                                  },

                                body:
                                  JSON.stringify(
                                    {
                                      listingId:
                                        item.listingId,
                                    }
                                  ),
                              }
                            );

                          if (
                            response.ok
                          ) {
                            window.location.reload();
                          }
                        }}
                        className="
                          rounded-full
                          bg-red-50
                          px-5
                          py-2
                          font-medium
                          text-red-600
                          transition
                          hover:bg-red-100
                        "
                      >
                        Remove ❤️
                      </button>
                    </div>
                  </Card>
                )
              )
          ) : (
            <Card className="p-8">
              No saved listings yet.
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
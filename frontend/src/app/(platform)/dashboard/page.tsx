"use client";

import Link from "next/link";

import {
  ArrowRight,
  Heart,
  Home,
  MessageCircle,
  Plus,
  ShoppingBag,
} from "lucide-react";

import { Card } from "@/components/ui/Card";

import {
  useSavedListings,
} from "@/hooks/use-saved-listings";

import {
  useMyListings,
} from "@/hooks/use-my-listings";

import {
  useCurrentUser,
} from "@/hooks/use-current-user";

const quickActions = [
  {
    title: "Create Listing",
    subtitle: "Post marketplace products",
    href: "/create-listing",
    icon: Plus,
    color: "bg-blue-100 text-blue-700",
  },

  {
    title: "Create Dorm",
    subtitle: "Add accommodation",
    href: "/create-dorm",
    icon: Home,
    color: "bg-emerald-100 text-emerald-700",
  },

  {
    title: "Marketplace",
    subtitle: "Continue browsing",
    href: "/marketplace",
    icon: ShoppingBag,
    color: "bg-violet-100 text-violet-700",
  },

  {
    title: "Messages",
    subtitle: "Continue conversations",
    href: "/messages",
    icon: MessageCircle,
    color: "bg-pink-100 text-pink-700",
  },
];

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

  const user =
    useCurrentUser();

  const username =
    user?.name ??
    "Student";

  return (
    <div
      className="
        space-y-14
      "
    >
      {/* HERO */}
      <Card
        className="
          rounded-[36px]
          p-10
        "
      >
        <div
          className="
            flex
            flex-col
            gap-8

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            <p
              className="
                font-medium
                text-blue-600
              "
            >
              Dashboard
            </p>

            <h1
              className="
                mt-4

                text-5xl
                font-black

                tracking-tight
              "
            >
              Welcome back,
              {" "}
              {username}
            </h1>

            <p
              className="
                mt-5

                max-w-2xl

                text-lg
                leading-8

                text-slate-600
              "
            >
              Continue your
              student journey.
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
        <h2
          className="
            text-3xl
            font-black
          "
        >
          Quick Actions
        </h2>

        <div
          className="
            mt-8

            grid
            gap-6

            md:grid-cols-2
          "
        >
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
                  <Card
                    className="
                      h-full

                      rounded-[30px]

                      p-8

                      transition

                      hover:-translate-y-1
                    "
                  >
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

                    <h3
                      className="
                        mt-7
                        text-2xl
                        font-bold
                      "
                    >
                      {
                        action.title
                      }
                    </h3>

                    <p
                      className="
                        mt-3
                        text-slate-500
                      "
                    >
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
        <h2
          className="
            text-3xl
            font-black
          "
        >
          My Listings
        </h2>

        <div
          className="
            mt-8
            grid
            gap-5
          "
        >
          {listingsLoading ? (
            <Card className="p-8">
              Loading...
            </Card>
          ) : listings.length ? (
            listings
              .slice(0, 3)
              .map(
                (
                  listing: any
                ) => (
                  <Link
                    key={
                      listing.id
                    }
                    href={`/marketplace/${listing.id}`}
                  >
                    <Card
                      className="
                        p-8
                        transition
                        hover:-translate-y-1
                        hover:shadow-md
                      "
                    >
                      <h3
                        className="
                          text-xl
                          font-bold
                        "
                      >
                        {
                          listing.title
                        }
                      </h3>

                      <p
                        className="
                          mt-3
                          text-slate-500
                        "
                      >
                        Rs.
                        {
                          listing.price
                        }
                      </p>
                    </Card>
                  </Link>
                )
              )
          ) : (
            <Card className="p-8">
              No listings yet.
            </Card>
          )}
        </div>
      </section>

      {/* SAVED */}
      <section>
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <Heart
            className="
              text-red-500
            "
          />

          <h2
            className="
              text-3xl
              font-black
            "
          >
            Saved Listings
          </h2>
        </div>

        <div
          className="
            mt-8

            grid
            gap-5

            lg:grid-cols-3
          "
        >
          {savedLoading ? (
            <Card className="p-8">
              Loading...
            </Card>
          ) : savedListings.length ? (
            savedListings
              .slice(0, 3)
              .map(
                (
                  item: any
                ) => (
                  <Link
                    key={
                      item.id
                    }
                    href={`/marketplace/${item.listingId}`}
                  >
                    <Card
                      className="
                        p-7
                        transition
                        hover:-translate-y-1
                        hover:shadow-md
                      "
                    >
                      <h3
                        className="
                          text-xl
                          font-bold
                        "
                      >
                        {
                          item
                            .listing
                            ?.title
                        }
                      </h3>

                      <div
                        className="
                          mt-8

                          flex
                          items-center
                          gap-3

                          text-blue-600
                        "
                      >
                        Open

                        <ArrowRight />
                      </div>
                    </Card>
                  </Link>
                )
              )
          ) : (
            <Card className="p-8">
              Nothing saved yet.
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
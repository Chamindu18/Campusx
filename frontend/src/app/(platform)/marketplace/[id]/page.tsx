"use client";

/**
 * Marketplace listing detail page.
 */

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import Image from "next/image";

import {
  Flag,
  Heart,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";

import { ReportModal } from "@/components/ui/ReportModal";

interface ListingPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Listing {
  id: string;

  title: string;

  description: string;

  category: string;

  price: number;

  imageUrls: string[];

  condition: string;

  location: string;

  user: {
    id: string;

    name: string;

    email: string;
  };
}

export default function ListingPage({
  params,
}: ListingPageProps) {
  /**
   * Listing state.
   */
  const [listing, setListing] =
    useState<Listing | null>(
      null
    );

  /**
   * Loading state.
   */
  const [loading, setLoading] =
    useState(true);

  /**
   * Active image.
   */
  const [
    activeImage,
    setActiveImage,
  ] = useState("");

  /**
   * Report modal state.
   */
  const [reportOpen, setReportOpen] =
    useState(false);

  /**
   * Save loading.
   */
  const [saving, setSaving] =
    useState(false);

  /**
   * Messaging loading.
   */
  const [
    messaging,
    setMessaging,
  ] = useState(false);

  /**
   * Fetch listing.
   */
  useEffect(() => {
    async function fetchListing() {
      try {
        const resolvedParams =
          await params;

        const response =
          await fetch(
            `/api/listings/${resolvedParams.id}`
          );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch listing"
          );
        }

        const data =
          await response.json();

        setListing(data);

        setActiveImage(
          data.imageUrls?.[0] ||
            ""
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to load listing"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchListing();
  }, [params]);

  /**
   * Save listing.
   */
  async function handleSave() {
    if (!listing) {
      return;
    }

    try {
      setSaving(true);

      const response =
        await fetch(
          "/api/saved-listings",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              listingId:
                listing.id,
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        toast.error(
          result.error
        );

        return;
      }

      toast.success(
        "Listing saved"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to save listing"
      );
    } finally {
      setSaving(false);
    }
  }

  /**
   * Message seller.
   */
  async function handleMessageSeller() {
    if (!listing) {
      return;
    }

    try {
      setMessaging(true);

      const response =
        await fetch(
          "/api/conversations",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              targetUserId:
                listing.user.id,
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        toast.error(
          result.error ||
            "Failed to open chat"
        );

        return;
      }

      toast.success(
        "Conversation opened"
      );

      window.location.href = `/messages?conversationId=${result.id}`;
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to message seller"
      );
    } finally {
      setMessaging(false);
    }
  }

  /**
   * Loading state.
   */
  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-slate-500">
          Loading listing...
        </p>
      </div>
    );
  }

  /**
   * Not found.
   */
  if (!listing) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-slate-500">
          Listing not found
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 xl:grid-cols-2">
          {/* ================================= */}
          {/* IMAGES */}
          {/* ================================= */}

          <div>
            {/* Main image */}
            <div
              className="
                relative
                h-[260px]
                overflow-hidden
                rounded-3xl
                bg-slate-100
                sm:h-[380px]
                lg:h-[500px]
              "
            >
              <Image
                src={
                  activeImage
                }
                alt={
                  listing.title
                }
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {listing.imageUrls.map(
                (image) => (
                  <button
                    key={image}
                    onClick={() =>
                      setActiveImage(
                        image
                      )
                    }
                    className={`
                      relative
                      h-20
                      overflow-hidden
                      rounded-2xl
                      border-2
                      transition

                      ${
                        activeImage ===
                        image
                          ? "border-blue-600"
                          : "border-transparent"
                      }
                    `}
                  >
                    <Image
                      src={image}
                      alt={
                        listing.title
                      }
                      fill
                      className="object-cover"
                    />
                  </button>
                )
              )}
            </div>
          </div>

          {/* ================================= */}
          {/* CONTENT */}
          {/* ================================= */}

          <div>
            {/* Category */}
            <div
              className="
                inline-flex
                rounded-full
                bg-blue-100
                px-4
                py-2
                text-sm
                font-semibold
                text-blue-700
              "
            >
              {
                listing.category
              }
            </div>

            {/* Title */}
            <h1
              className="
                mt-6
                text-3xl
                font-black
                tracking-tight
                text-slate-900
                sm:text-4xl
                lg:text-5xl
              "
            >
              {listing.title}
            </h1>

            {/* Location */}
            <div
              className="
                mt-5
                flex
                items-center
                gap-2
                text-slate-500
              "
            >
              <MapPin className="h-5 w-5" />

              <span>
                {
                  listing.location
                }
              </span>
            </div>

            {/* Price */}
            <div className="mt-8">
              <p
                className="
                  text-4xl
                  font-black
                  text-slate-900
                  sm:text-5xl
                "
              >
                LKR{" "}
                {listing.price.toLocaleString()}
              </p>
            </div>

            {/* Condition */}
            <div className="mt-8">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-emerald-100
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-emerald-700
                "
              >
                <ShieldCheck className="h-4 w-4" />

                {
                  listing.condition
                }
              </div>
            </div>

            {/* Description */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900">
                Description
              </h2>

              <p
                className="
                  mt-5
                  break-words
                  leading-8
                  text-slate-600
                "
              >
                {
                  listing.description
                }
              </p>
            </div>

            {/* Seller */}
            <div
              className="
                mt-12
                rounded-3xl
                border
                border-white/40
                bg-white/70
                p-6
                backdrop-blur-xl
                sm:p-8
              "
            >
              <h2 className="text-2xl font-bold text-slate-900">
                Seller Information
              </h2>

              <div className="mt-5">
                <p className="font-semibold text-slate-900">
                  {
                    listing.user
                      .name
                  }
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {
                    listing.user
                      .email
                  }
                </p>
              </div>

              {/* ACTIONS */}
              <div
                className="
                  mt-8
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:flex-wrap
                "
              >
                {/* Message */}
                <Button
                  onClick={
                    handleMessageSeller
                  }
                  disabled={
                    messaging
                  }
                  className="
                    h-14
                    flex-1
                    rounded-2xl
                    sm:flex-none
                  "
                >
                  <MessageCircle className="mr-2 h-5 w-5" />

                  {messaging
                    ? "Opening..."
                    : "Message Seller"}
                </Button>

                {/* Save */}
                <Button
                  variant="secondary"
                  onClick={
                    handleSave
                  }
                  disabled={
                    saving
                  }
                  className="
                    h-14
                    rounded-2xl
                  "
                >
                  <Heart className="mr-2 h-5 w-5" />

                  Save
                </Button>

                {/* Report */}
                <Button
                  variant="destructive"
                  onClick={() =>
                    setReportOpen(
                      true
                    )
                  }
                  className="
                    h-14
                    rounded-2xl
                  "
                >
                  <Flag className="mr-2 h-5 w-5" />

                  Report
                </Button>
              </div>
            </div>

            {/* Back */}
            <div className="mt-8">
              <Link
                href="/marketplace"
                className="
                  text-sm
                  font-semibold
                  text-blue-600
                "
              >
                ← Back to marketplace
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* REPORT MODAL */}
      <ReportModal
        open={reportOpen}
        onClose={() =>
          setReportOpen(
            false
          )
        }
        listingId={listing.id}
      />
    </>
  );
}
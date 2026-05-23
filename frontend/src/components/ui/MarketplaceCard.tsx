"use client";

/**
 * Marketplace listing card.
 */

import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";

import {
  Heart,
  MapPin,
} from "lucide-react";

import toast from "react-hot-toast";

import { Card } from "@/components/ui/Card";

interface MarketplaceCardProps {
  id: string;

  title: string;

  category?: string;

  price?: number;

  condition?: string;

  location?: string;

  imageUrls?: string[];
}

export function MarketplaceCard({
  id,
  title,
  category = "General",
  price = 0,
  condition = "Not specified",
  location = "Unknown location",
  imageUrls = [],
}: MarketplaceCardProps) {
  /**
   * Save listing.
   */
  async function handleSave(
    event: React.MouseEvent
  ) {
    event.preventDefault();

    try {
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
              listingId: id,
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        toast.error(
          result.error ||
            "Failed to save listing"
        );

        return;
      }

      toast.success(
        "Listing saved"
      );
    } catch (
      error
    ) {
      console.error(
        error
      );

      toast.error(
        "Failed to save listing"
      );
    }
  }

  /**
   * Safe price display.
   */
  const formattedPrice =
    Number(
      price
    ).toLocaleString();

  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <Link
        href={`/marketplace/${id}`}
      >
        <Card
          className="
            group
            overflow-hidden
            border-white/40
            bg-white/70
            shadow-lg
            shadow-slate-200/30
            backdrop-blur-xl
            transition-all
            duration-300
            hover:shadow-2xl
          "
        >
          {/* IMAGE */}
          <div
            className="
              relative
              h-56
              overflow-hidden
              bg-slate-100
            "
          >
            {/* Save */}
            <button
              onClick={
                handleSave
              }
              className="
                absolute
                right-4
                top-4
                z-20
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                bg-white/80
                backdrop-blur-xl
              "
            >
              <Heart className="h-5 w-5" />
            </button>

            {imageUrls?.[0] ? (
              <Image
                src={
                  imageUrls[0]
                }
                alt={
                  title
                }
                fill
                className="
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
              />
            ) : (
              <div
                className="
                  h-full
                  bg-gradient-to-br
                  from-blue-100
                  via-indigo-100
                  to-cyan-100
                "
              />
            )}
          </div>

          {/* CONTENT */}
          <div className="p-6">
            <div
              className="
                inline-flex
                rounded-full
                bg-blue-100
                px-3
                py-1
                text-xs
                font-semibold
                text-blue-700
              "
            >
              {category}
            </div>

            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              {title}
            </h3>

            <div className="mt-5 space-y-3 text-sm text-slate-500">
              <p>
                {condition}
              </p>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />

                <span>
                  {location}
                </span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <span className="text-2xl font-black text-slate-900">
                LKR{" "}
                {
                  formattedPrice
                }
              </span>

              <span
                className="
                  rounded-xl
                  bg-blue-600
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                "
              >
                View
              </span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
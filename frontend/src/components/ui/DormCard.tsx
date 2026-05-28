"use client";

import Image from "next/image";

import Link from "next/link";

import {
  MapPin,
  GraduationCap,
  BedDouble,
} from "lucide-react";

/* ===================================================== */
/* TYPES */
/* ===================================================== */

interface DormCardProps {
  id: string;

  title: string;

  university: string;

  city: string;

  gender: string;

  roomType: string;

  price: number;

  imageUrls: string[];

  distanceFromUniversity: string;
}

/* ===================================================== */
/* COMPONENT */
/* ===================================================== */

export function DormCard({
  id,
  title,
  university,
  city,
  gender,
  roomType,
  price,
  imageUrls,
  distanceFromUniversity,
}: DormCardProps) {
  /**
   * Safe image fallback.
   */
  const image =
    imageUrls?.[0] ||
    "/placeholder.jpg";

  return (
    <Link
      href={`/dorms/${id}`}
      className="
        group
        block
        overflow-hidden
        rounded-3xl
        border
        border-white/40
        bg-white/70
        shadow-lg
        shadow-slate-200/30
        backdrop-blur-xl
        transition
        hover:-translate-y-1
      "
    >
      {/* IMAGE */}

      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="
            object-cover
            transition
            duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* CONTENT */}

      <div className="p-6">
        {/* TOP */}

        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {title}
            </h2>

            <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4" />

              <span>
                {city}
              </span>
            </div>
          </div>

          <div
            className="
              rounded-full
              bg-blue-100
              px-4
              py-2
              text-sm
              font-semibold
              text-blue-700
            "
          >
            {gender}
          </div>
        </div>

        {/* UNIVERSITY */}

        <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
          <GraduationCap className="h-4 w-4" />

          <span>
            {university}
          </span>
        </div>

        {/* ROOM TYPE */}

        <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
          <BedDouble className="h-4 w-4" />

          <span>
            {roomType}
          </span>
        </div>

        {/* DISTANCE */}

        <div className="mt-4">
          <p className="text-sm text-slate-500">
            {
              distanceFromUniversity
            }
          </p>
        </div>

        {/* PRICE */}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-3xl font-black text-slate-900">
            LKR{" "}
            {price.toLocaleString()}
          </p>

          <span className="text-sm text-slate-500">
            / month
          </span>
        </div>
      </div>
    </Link>
  );
}
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
    imageUrls?.[0] ??
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
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* IMAGE */}

      <div className="relative h-48 overflow-hidden sm:h-56 md:h-64">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* CONTENT */}

      <div className="p-5 md:p-6">
        {/* TOP */}

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2
              className="
                line-clamp-2
                text-xl
                font-bold
                text-slate-900
                md:text-2xl
              "
            >
              {title}
            </h2>

            <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4 shrink-0" />

              <span className="truncate">
                {city}
              </span>
            </div>
          </div>

          <div
            className="
              shrink-0
              rounded-full
              bg-blue-100
              px-3
              py-2
              text-xs
              font-semibold
              text-blue-700
              sm:px-4
              sm:text-sm
            "
          >
            {gender}
          </div>
        </div>

        {/* UNIVERSITY */}

        <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
          <GraduationCap className="h-4 w-4 shrink-0" />

          <span className="truncate">
            {university}
          </span>
        </div>

        {/* ROOM TYPE */}

        <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
          <BedDouble className="h-4 w-4 shrink-0" />

          <span className="truncate">
            {roomType}
          </span>
        </div>

        {/* DISTANCE */}

        <div className="mt-4">
          <p className="line-clamp-2 text-sm text-slate-500">
            {distanceFromUniversity}
          </p>
        </div>

        {/* PRICE */}

        <div className="mt-6 flex items-center justify-between gap-3">
          <p
            className="
              whitespace-nowrap
              text-2xl
              font-black
              text-slate-900
              md:text-3xl
            "
          >
            LKR {price.toLocaleString()}
          </p>

          <span
            className="
              shrink-0
              text-sm
              text-slate-500
            "
          >
            / month
          </span>
        </div>
      </div>
    </Link>
  );
}
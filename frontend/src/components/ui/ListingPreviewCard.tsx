/**
 * Marketplace preview card.
 *
 * Used for hero visual composition.
 */

import {
  Laptop,
  BookOpen,
  Gamepad2,
} from "lucide-react";

import { Card } from "@/components/ui/Card";

interface ListingPreviewCardProps {
  title: string;
  category: string;
  price: string;
  type:
    | "electronics"
    | "books"
    | "gaming";
}

/**
 * Icon mapping.
 */
const iconMap = {
  electronics: Laptop,
  books: BookOpen,
  gaming: Gamepad2,
};

export function ListingPreviewCard({
  title,
  category,
  price,
  type,
}: ListingPreviewCardProps) {
  const Icon =
    iconMap[type];

  return (
    <Card
      className="
        group

        w-full
        max-w-sm

        border
        border-slate-200

        bg-white

        p-5

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* TOP */}

      <div className="flex items-start justify-between gap-3">
        {/* ICON */}

        <div
          className="
            flex

            h-12
            w-12

            shrink-0

            items-center
            justify-center

            rounded-2xl

            bg-blue-50

            text-blue-600
          "
        >
          <Icon className="h-6 w-6" />
        </div>

        {/* CATEGORY */}

        <span
          className="
            shrink-0

            rounded-full

            bg-slate-100

            px-3
            py-1

            text-xs
            font-medium

            text-slate-600
          "
        >
          {category}
        </span>
      </div>

      {/* CONTENT */}

      <div className="mt-5">
        <h3
          className="
            line-clamp-2

            text-lg
            font-semibold

            text-slate-900
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-2

            text-sm

            text-slate-500
          "
        >
          Campus marketplace listing preview
        </p>
      </div>

      {/* FOOTER */}

      <div className="mt-6 flex items-center justify-between gap-3">
        <span
          className="
            whitespace-nowrap

            text-xl
            font-bold

            text-slate-900
          "
        >
          {price}
        </span>

        <span
          className="
            rounded-lg

            bg-slate-100

            px-3
            py-2

            text-sm
            font-medium

            text-slate-700
          "
        >
          View
        </span>
      </div>
    </Card>
  );
}
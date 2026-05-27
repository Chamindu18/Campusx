/**
 * Marketplace listing validation.
 */

import { z } from "zod";

import {
  priceSchema,
  safeText,
} from "./common";

export const listingSchema =
  z.object({
    title: z
      .string()
      .trim()
      .min(
        3,
        "Title is too short"
      )
      .max(
        120,
        "Title is too long"
      ),

    category: z
      .string()
      .trim()
      .min(
        1,
        "Category is required"
      )
      .max(
        50,
        "Category is too long"
      ),

    price:
      priceSchema,

    description:
      safeText.min(
        20,
        "Description must be at least 20 characters"
      ),

    condition: z
      .string()
      .trim()
      .min(
        1,
        "Condition is required"
      ),

    location: z
      .string()
      .trim()
      .min(
        1,
        "Location is required"
      ),

    imageUrls: z
      .array(
        z.string().url()
      )
      .max(
        10,
        "Maximum 10 images allowed"
      )
      .optional(),
  });

export type ListingFormValues =
  z.infer<
    typeof listingSchema
  >;
import { z } from "zod";

/**
 * Dorm validation schema.
 */
export const dormSchema =
  z.object({
    title: z
      .string()
      .min(
        5,
        "Title must be at least 5 characters"
      ),

    description: z
      .string()
      .min(
        20,
        "Description must be at least 20 characters"
      ),

    university: z
      .string()
      .min(
        2,
        "University is required"
      ),

    city: z
      .string()
      .min(
        2,
        "City is required"
      ),

    gender: z
      .string()
      .min(
        1,
        "Gender is required"
      ),

    roomType: z
      .string()
      .min(
        1,
        "Room type is required"
      ),

    /**
     * IMPORTANT:
     * HTML inputs return strings.
     * z.coerce.number() converts safely.
     */
    price: z.coerce
      .number()
      .positive(
        "Price must be positive"
      ),

    facilities:
      z.array(
        z.string()
      ).optional(),

    imageUrls:
      z.array(
        z.string()
      ).optional(),

    contactNumber: z
      .string()
      .min(
        10,
        "Contact number is required"
      ),

    distanceFromUniversity:
      z
        .string()
        .min(
          2,
          "Distance is required"
        ),
  });

/**
 * IMPORTANT:
 * Use INPUT type for RHF compatibility.
 */
export type DormFormValues =
  z.input<
    typeof dormSchema
  >;
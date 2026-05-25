/**
 * Single source of truth
 * for marketplace categories.
 *
 * Marketplace → uses MARKETPLACE_CATEGORIES
 * Create/Edit Listing → uses LISTING_CATEGORIES
 */

export const LISTING_CATEGORIES = [
  "Books",

  "Study Materials",

  "Electronics",

  "Furniture",

  "Accessories",

  "Other",
] as const;

export const MARKETPLACE_CATEGORIES = [
  "All",

  ...LISTING_CATEGORIES,
] as const;

/**
 * Type-safe category type
 */
export type ListingCategory =
  (typeof LISTING_CATEGORIES)[number];

/**
 * Validation helper
 */
export function isValidCategory(
  value: string
): value is ListingCategory {
  return LISTING_CATEGORIES.includes(
    value as ListingCategory
  );
}
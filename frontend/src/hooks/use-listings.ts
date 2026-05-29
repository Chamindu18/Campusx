/**
 * Marketplace listings hook.
 */

"use client";

import useSWR from "swr";

/* ===================================================== */
/* TYPES */
/* ===================================================== */

export interface Listing {
  id: string;

  title: string;

  category: string;

  price: number;

  description: string;

  condition: string;

  location: string;

  imageUrls: string[];

  createdAt?: string;
}

interface ListingsResponse {
  listings: Listing[];

  pagination: {
    page: number;

    limit: number;

    totalListings: number;

    totalPages: number;
  };
}

interface UseListingsProps {
  search?: string;

  category?: string;

  page?: number;
}

/* ===================================================== */
/* FETCHER */
/* ===================================================== */

const fetcher = async (
  url: string
): Promise<ListingsResponse> => {
  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch listings"
    );
  }

  return response.json();
};

/* ===================================================== */
/* HOOK */
/* ===================================================== */

export function useListings({
  search = "",
  category = "",
  page = 1,
}: UseListingsProps) {
  const params =
    new URLSearchParams({
      search,

      category,

      page: String(page),
    });

  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR<ListingsResponse>(
    `/api/listings?${params.toString()}`,
    fetcher
  );

  return {
    listings:
      data?.listings ??
      [],

    pagination:
      data?.pagination,

    error,

    isLoading,

    mutate,
  };
}
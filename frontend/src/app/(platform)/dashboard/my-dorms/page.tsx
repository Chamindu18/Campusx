"use client";

/**
 * User dorm management page.
 */

import Link from "next/link";

import useSWR from "swr";

import {
  Pencil,
  Trash2,
  Home,
} from "lucide-react";

import toast from "react-hot-toast";

/* ===================================================== */
/* TYPES */
/* ===================================================== */

interface Dorm {
  id: string;

  title: string;

  university: string;

  price: number;
}

interface DormsResponse {
  dorms: Dorm[];
}

/* ===================================================== */
/* FETCHER */
/* ===================================================== */

const fetcher = async (
  url: string
): Promise<DormsResponse> => {
  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch"
    );
  }

  return response.json();
};

/* ===================================================== */
/* PAGE */
/* ===================================================== */

export default function MyDormsPage() {
  /**
   * Dorms.
   */
  const {
    data,
    mutate,
  } = useSWR(
    "/api/my-dorms",
    fetcher
  );

  const dorms =
    data?.dorms || [];

  /* ===================================================== */
  /* DELETE DORM */
  /* ===================================================== */

  async function handleDelete(
    id: string
  ) {
    const confirmed =
      confirm(
        "Delete this dorm?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `/api/dorms/${id}`,
          {
            method:
              "DELETE",
          }
        );

      const result =
        await response.json();

      if (
        !response.ok
      ) {
        toast.error(
          result.error
        );

        return;
      }

      toast.success(
        "Dorm deleted"
      );

      mutate();
    } catch (
      error: unknown
    ) {
      console.error(
        error
      );

      toast.error(
        "Failed to delete dorm"
      );
    }
  }

  return (
    <div>
      {/* HEADER */}

      <div className="flex items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900">
            My Dorms
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Manage your dorm listings.
          </p>
        </div>

        <Link
          href="/create-dorm"
          className="
            rounded-2xl
            bg-blue-600
            px-6
            py-4
            text-sm
            font-semibold
            text-white
          "
        >
          Create Dorm
        </Link>
      </div>

      {/* DORMS */}

      <div className="mt-12 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {dorms.map(
          (
            dorm
          ) => (
            <div
              key={
                dorm.id
              }
              className="
                rounded-3xl
                border
                border-white/40
                bg-white/70
                p-6
                backdrop-blur-xl
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-blue-100
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-blue-700
                    "
                  >
                    <Home className="h-3 w-3" />

                    {
                      dorm.university
                    }
                  </div>

                  <h2 className="mt-4 text-2xl font-bold text-slate-900">
                    {
                      dorm.title
                    }
                  </h2>

                  <p className="mt-4 text-slate-500">
                    LKR{" "}
                    {dorm.price.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* ACTIONS */}

              <div className="mt-8 flex gap-3">
                <Link
                  href={`/dorms/edit/${dorm.id}`}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  <Pencil className="h-4 w-4" />

                  Edit
                </Link>

                <button
                  onClick={() =>
                    handleDelete(
                      dorm.id
                    )
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-red-600
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  <Trash2 className="h-4 w-4" />

                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
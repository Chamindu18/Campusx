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

interface Dorm {
  id: string;
  title: string;
  university: string;
  price: number;
}

interface DormsResponse {
  dorms: Dorm[];
}

const fetcher = async (
  url: string
): Promise<DormsResponse> => {
  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch dorms"
    );
  }

  return response.json();
};

export default function MyDormsPage() {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR(
    "/api/my-dorms",
    fetcher
  );

  const dorms =
    data?.dorms ?? [];

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

      if (!response.ok) {
        toast.error(
          result.error ??
            "Failed to delete dorm"
        );

        return;
      }

      toast.success(
        "Dorm deleted"
      );

      mutate();
    } catch (
      error
    ) {
      console.error(
        error
      );

      toast.error(
        "Failed to delete dorm"
      );
    }
  }

  if (isLoading) {
    return (
      <div
        className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {Array.from({
          length: 6,
        }).map((_, i) => (
          <div
            key={i}
            className="
              h-64
              animate-pulse
              rounded-3xl
              bg-white/70
            "
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          rounded-3xl
          bg-white/70
          p-8
          text-center
        "
      >
        <h2
          className="
            text-2xl
            font-bold
            text-red-600
          "
        >
          Failed to load dorms
        </h2>

        <button
          type="button"
          onClick={() =>
            mutate()
          }
          className="
            mt-5
            rounded-2xl
            bg-blue-600
            px-5
            py-3
            text-white
          "
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-6

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h1
            className="
              text-3xl
              font-black
              tracking-tight
              text-slate-900

              sm:text-4xl
              md:text-5xl
            "
          >
            My Dorms
          </h1>

          <p
            className="
              mt-4
              text-lg
              text-slate-600
            "
          >
            Manage your dorm listings.
          </p>
        </div>

        <Link
          href="/create-dorm"
          className="
            inline-flex
            items-center
            justify-center

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

      {/* EMPTY */}

      {dorms.length ===
        0 && (
        <div
          className="
            mt-12

            rounded-3xl

            bg-white/70

            p-12

            text-center
          "
        >
          <Home
            className="
              mx-auto
              h-12
              w-12
              text-slate-400
            "
          />

          <h2
            className="
              mt-5
              text-2xl
              font-bold
            "
          >
            No dorms yet
          </h2>

          <p
            className="
              mt-3
              text-slate-500
            "
          >
            Create your first dorm
            listing.
          </p>
        </div>
      )}

      {/* DORMS */}

      <div
        className="
          mt-12

          grid
          grid-cols-1
          gap-8

          lg:grid-cols-2
          xl:grid-cols-3
        "
      >
        {dorms.map(
          (dorm) => (
            <div
              key={dorm.id}
              className="
                rounded-3xl

                border
                border-white/40

                bg-white/70

                p-5
                md:p-6

                backdrop-blur-xl
              "
            >
              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                "
              >
                <div className="min-w-0">
                  <div
                    className="
                      inline-flex
                      max-w-full

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
                    <Home className="h-3 w-3 shrink-0" />

                    <span className="truncate">
                      {dorm.university}
                    </span>
                  </div>

                  <h2
                    className="
                      mt-4

                      line-clamp-2

                      text-xl
                      font-bold

                      text-slate-900

                      md:text-2xl
                    "
                  >
                    {dorm.title}
                  </h2>

                  <p
                    className="
                      mt-4

                      text-lg
                      font-semibold

                      text-slate-600
                    "
                  >
                    LKR{" "}
                    {dorm.price.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* ACTIONS */}

              <div
                className="
                  mt-8

                  flex
                  flex-col
                  gap-3

                  sm:flex-row
                "
              >
                <Link
                  href={`/dorms/edit/${dorm.id}`}
                  className="
                    flex
                    flex-1

                    items-center
                    justify-center

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
                  type="button"
                  onClick={() =>
                    handleDelete(
                      dorm.id
                    )
                  }
                  className="
                    flex
                    flex-1

                    items-center
                    justify-center

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
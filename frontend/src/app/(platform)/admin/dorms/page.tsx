"use client";

/**
 * Admin dorm moderation.
 */

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import toast from "react-hot-toast";

interface Dorm {
  id: string;

  title: string;

  university?: string;

  city?: string;

  price: number;

  user: {
    id: string;

    name: string;
  };
}

export default function AdminDormsPage() {
  const [
    dorms,
    setDorms,
  ] =
    useState<
      Dorm[]
    >([]);

  const [
    loading,
    setLoading,
  ] =
    useState(
      true
    );

  const [
    search,
    setSearch,
  ] =
    useState("");

  async function fetchDorms() {
    try {
      setLoading(
        true
      );

      const response =
        await fetch(
          "/api/admin/dorms"
        );

      if (
        !response.ok
      ) {
        throw new Error();
      }

      const data =
        await response.json();

      setDorms(
        data
      );
    } catch {
      toast.error(
        "Failed to load dorms"
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  async function deleteDorm(
    id: string
  ) {
    if (
      !confirm(
        "Delete dorm?"
      )
    ) {
      return;
    }

    try {
      const response =
        await fetch(
          `/api/admin/dorms/${id}`,
          {
            method:
              "DELETE",
          }
        );

      if (
        !response.ok
      ) {
        throw new Error();
      }

      toast.success(
        "Dorm removed"
      );

      fetchDorms();
    } catch {
      toast.error(
        "Failed to delete dorm"
      );
    }
  }

  useEffect(() => {
    fetchDorms();
  }, []);

  const filtered =
    useMemo(
      () =>
        dorms.filter(
          (
            dorm
          ) =>
            dorm.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        ),

      [
        dorms,
        search,
      ]
    );

  if (
    loading
  ) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Loading dorms...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black sm:text-4xl md:text-5xl">
          Dorms
        </h1>

        <p className="mt-3 text-slate-600">
          Moderate dorm listings
        </p>
      </div>

      <input
        value={
          search
        }
        onChange={(
          e
        ) =>
          setSearch(
            e.target
              .value
          )
        }
        placeholder="Search dorm..."
        className="
          h-12
          w-full
          rounded-2xl
          border
          px-5
        "
      />

      <div className="space-y-6">
        {filtered.map(
          (
            dorm
          ) => (
            <div
              key={
                dorm.id
              }
              className="
                rounded-3xl
                bg-white/70
                p-8
              "
            >
              <h2 className="text-2xl font-black">
                {
                  dorm.title
                }
              </h2>

              <p className="mt-2 text-slate-500">
                Owner:
                {" "}
                {
                  dorm
                    .user
                    .name
                }
              </p>

              <div className="mt-5 flex gap-3">
                <span>
                  {
                    dorm.university
                  }
                </span>

                <span>
                  {
                    dorm.city
                  }
                </span>

                <span>
                  Rs.
                  {
                    dorm.price
                  }
                </span>
              </div>

              <div className="mt-8 flex gap-4">
                <Link
                  href={`/dorms/${dorm.id}`}
                  className="
                    rounded-2xl
                    border
                    px-5
                    py-3
                  "
                >
                  View
                </Link>

                <button
                  onClick={() =>
                    deleteDorm(
                      dorm.id
                    )
                  }
                  className="
                    rounded-2xl
                    bg-red-600
                    px-5
                    py-3
                    text-white
                  "
                >
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
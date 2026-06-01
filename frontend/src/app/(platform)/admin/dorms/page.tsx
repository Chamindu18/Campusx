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
  ] = useState<Dorm[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState("");

  async function fetchDorms() {
    try {
      setLoading(true);
      setError(false);

      const response =
        await fetch(
          "/api/admin/dorms"
        );

      if (!response.ok) {
        throw new Error();
      }

      const data =
        await response.json();

      setDorms(data);
    } catch {
      setError(true);

      toast.error(
        "Failed to load dorms"
      );
    } finally {
      setLoading(false);
    }
  }

  async function deleteDorm(
    id: string
  ) {
    if (
      !confirm(
        "Delete this dorm listing?"
      )
    ) {
      return;
    }

    try {
      const response =
        await fetch(
          `/api/admin/dorms/${id}`,
          {
            method: "DELETE",
          }
        );

      if (!response.ok) {
        throw new Error();
      }

      setDorms((prev) =>
        prev.filter(
          (dorm) =>
            dorm.id !== id
        )
      );

      toast.success(
        "Dorm removed"
      );
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
          (dorm) =>
            dorm.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        ),
      [dorms, search]
    );

  if (loading) {
    return (
      <div
        className="
          grid
          gap-6
        "
      >
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <div
            key={index}
            className="
              h-48
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
          p-6
        "
      >
        <h2
          className="
            text-xl
            font-bold
            text-red-600
          "
        >
          Failed to load dorms
        </h2>

        <button
          onClick={
            fetchDorms
          }
          className="
            mt-4
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
    <div
      className="
        space-y-8
        md:space-y-10
      "
    >
      {/* HEADER */}

      <div>
        <h1
          className="
            text-3xl
            font-black
            sm:text-4xl
            md:text-5xl
          "
        >
          Dorms
        </h1>

        <p
          className="
            mt-3
            text-slate-600
          "
        >
          Moderate dorm listings
        </p>
      </div>

      {/* SEARCH */}

      <input
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        placeholder="Search dorm..."
        className="
          h-12
          w-full
          rounded-2xl
          border
          border-slate-200
          px-5
        "
      />

      {/* EMPTY STATE */}

      {filtered.length ===
        0 && (
        <div
          className="
            rounded-3xl
            bg-white/70
            p-8
            text-center
          "
        >
          No dorms found.
        </div>
      )}

      {/* LIST */}

      <div className="space-y-6">
        {filtered.map(
          (dorm) => (
            <div
              key={dorm.id}
              className="
                rounded-3xl
                bg-white/70
                p-5
                md:p-8
              "
            >
              <h2
                className="
                  text-xl
                  font-black
                  md:text-2xl
                "
              >
                {dorm.title}
              </h2>

              <p
                className="
                  mt-2
                  text-slate-500
                "
              >
                Owner:{" "}
                {
                  dorm.user
                    .name
                }
              </p>

              <div
                className="
                  mt-5

                  flex
                  flex-col
                  gap-2

                  text-sm
                  text-slate-600

                  sm:flex-row
                  sm:flex-wrap
                  sm:gap-4
                "
              >
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
                  Rs.{" "}
                  {dorm.price.toLocaleString()}
                </span>
              </div>

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
                  href={`/dorms/${dorm.id}`}
                  className="
                    rounded-2xl
                    border
                    px-5
                    py-3
                    text-center
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
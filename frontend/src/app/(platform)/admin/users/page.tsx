"use client";

/**
 * Admin users management.
 */

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  university?: string;
  role: string;
  createdAt: string;

  _count?: {
    listings: number;
    dorms: number;
  };
}

export default function AdminUsersPage() {
  const [
    users,
    setUsers,
  ] = useState<User[]>([]);

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

  async function fetchUsers() {
    try {
      setLoading(true);
      setError(false);

      const response =
        await fetch(
          "/api/admin/users"
        );

      if (!response.ok) {
        throw new Error();
      }

      const data =
        await response.json();

      setUsers(data);
    } catch {
      setError(true);

      toast.error(
        "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered =
    useMemo(
      () =>
        users.filter(
          (user) =>
            user.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            user.email
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )
        ),
      [users, search]
    );

  if (loading) {
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
              h-72
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
          Failed to load users
        </h2>

        <button
          type="button"
          onClick={fetchUsers}
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
          Users
        </h1>

        <p
          className="
            mt-3
            text-slate-600
          "
        >
          View platform users
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
        placeholder="Search users..."
        className="
          h-12
          w-full
          rounded-2xl
          border
          border-slate-200
          px-5
        "
      />

      {/* EMPTY */}

      {filtered.length ===
        0 && (
        <div
          className="
            rounded-3xl
            bg-white/70
            p-8
            text-center
            md:p-12
          "
        >
          No users found.
        </div>
      )}

      {/* USERS */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {filtered.map(
          (user) => (
            <div
              key={user.id}
              className="
                rounded-3xl
                bg-white/70
                p-5
                shadow-sm
                md:p-8
              "
            >
              {/* AVATAR */}

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-slate-900
                  text-2xl
                  font-black
                  text-white
                "
              >
                {user.name
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              {/* NAME */}

              <h2
                className="
                  mt-6
                  break-words
                  text-xl
                  font-black
                  md:text-2xl
                "
              >
                {user.name}
              </h2>

              {/* EMAIL */}

              <p
                className="
                  mt-2
                  break-all
                  text-slate-500
                "
              >
                {user.email}
              </p>

              {/* UNIVERSITY */}

              <p
                className="
                  mt-3
                  text-sm
                "
              >
                {user.university ||
                  "No university"}
              </p>

              {/* ROLE */}

              <div className="mt-5">
                <span
                  className="
                    rounded-full
                    bg-blue-100
                    px-4
                    py-2
                    text-sm
                  "
                >
                  {user.role}
                </span>
              </div>

              {/* STATS */}

              <div
                className="
                  mt-8
                  grid
                  grid-cols-2
                  gap-4
                "
              >
                <div
                  className="
                    rounded-2xl
                    bg-slate-50
                    p-4
                  "
                >
                  <div
                    className="
                      text-3xl
                      font-black
                    "
                  >
                    {user._count
                      ?.listings ?? 0}
                  </div>

                  <div
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
                    Listings
                  </div>
                </div>

                <div
                  className="
                    rounded-2xl
                    bg-slate-50
                    p-4
                  "
                >
                  <div
                    className="
                      text-3xl
                      font-black
                    "
                  >
                    {user._count
                      ?.dorms ?? 0}
                  </div>

                  <div
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
                    Dorms
                  </div>
                </div>
              </div>

              {/* CREATED */}

              <p
                className="
                  mt-6
                  text-xs
                  text-slate-400
                "
              >
                Joined{" "}
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </p>

              {/* ACTION */}

              <div className="mt-8">
                <Link
                  href={`/profile/${user.id}`}
                  className="
                    inline-flex
                    rounded-2xl
                    bg-slate-900
                    px-5
                    py-3
                    text-white
                  "
                >
                  View Profile
                </Link>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
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
  ] =
    useState<
      User[]
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

  async function fetchUsers() {
    try {
      setLoading(
        true
      );

      const response =
        await fetch(
          "/api/admin/users"
        );

      if (
        !response.ok
      ) {
        throw new Error();
      }

      const data =
        await response.json();

      setUsers(
        data
      );
    } catch {
      toast.error(
        "Failed to load users"
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered =
    useMemo(
      () =>
        users.filter(
          (
            user
          ) =>
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

      [
        users,
        search,
      ]
    );

  if (
    loading
  ) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Loading users...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-black sm:text-4xl md:text-5xl">
          Users
        </h1>

        <p className="mt-3 text-slate-600">
          View platform users
        </p>
      </div>

      {/* SEARCH */}

      <div>
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
          placeholder="Search users..."
          className="
            h-12
            w-full
            rounded-2xl
            border
            px-5
          "
        />
      </div>

      {/* EMPTY */}

      {filtered.length ===
        0 && (
        <div className="rounded-3xl bg-white/70 p-12 text-center">
          No users found
        </div>
      )}

      {/* USERS */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map(
          (
            user
          ) => (
            <div
              key={
                user.id
              }
              className="
                rounded-3xl
                bg-white/70
                p-8
                shadow-sm
              "
            >
              {/* Avatar */}

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
                  ?.charAt(
                    0
                  )
                  .toUpperCase()}
              </div>

              <h2 className="mt-6 text-2xl font-black">
                {
                  user.name
                }
              </h2>

              <p className="mt-2 text-slate-500">
                {
                  user.email
                }
              </p>

              <p className="mt-2">
                {user.university ||
                  "No university"}
              </p>

              <div className="mt-5 flex gap-2">
                <span
                  className="
                    rounded-full
                    bg-blue-100
                    px-4
                    py-2
                    text-sm
                  "
                >
                  {
                    user.role
                  }
                </span>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-3xl font-black">
                    {user
                      ._count
                      ?.listings ||
                      0}
                  </div>

                  <div className="text-sm text-slate-500">
                    Listings
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-3xl font-black">
                    {user
                      ._count
                      ?.dorms ||
                      0}
                  </div>

                  <div className="text-sm text-slate-500">
                    Dorms
                  </div>
                </div>
              </div>

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
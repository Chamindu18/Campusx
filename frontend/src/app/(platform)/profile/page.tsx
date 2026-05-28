"use client";

/**
 * User profile page.
 */

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

interface UserProfile {
  id: string;

  name: string;

  email: string;

  university:
    string | null;

  bio:
    string | null;

  createdAt: string;
}

export default function ProfilePage() {
  const [
    profile,
    setProfile,
  ] =
    useState<UserProfile | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    saving,
    setSaving,
  ] =
    useState(false);

  const [
    form,
    setForm,
  ] =
    useState({
      name: "",
      university: "",
      bio: "",
    });

  /* ===================================================== */
  /* FETCH PROFILE */
  /* ===================================================== */

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response =
          await fetch(
            "/api/profile"
          );

        const data =
          await response.json();

        setProfile(
          data
        );

        setForm({
          name:
            data.name ||
            "",

          university:
            data.university ||
            "",

          bio:
            data.bio ||
            "",
        });
      } catch (
        error
      ) {
        console.error(
          error
        );

        toast.error(
          "Failed to load profile"
        );
      } finally {
        setLoading(
          false
        );
      }
    }

    fetchProfile();
  }, []);

  /* ===================================================== */
  /* UPDATE PROFILE */
  /* ===================================================== */

  async function handleSubmit(
    e:
      React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setSaving(
        true
      );

      const response =
        await fetch(
          "/api/profile",
          {
            method:
              "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                form
              ),
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

      setProfile(
        result
      );

      toast.success(
        "Profile updated"
      );
    } catch (
      error
    ) {
      console.error(
        error
      );

      toast.error(
        "Failed to update profile"
      );
    } finally {
      setSaving(
        false
      );
    }
  }

  /* ===================================================== */
  /* LOADING */
  /* ===================================================== */

  if (
    loading
  ) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="text-4xl font-black text-slate-900">
          Profile
        </h1>

        <p className="mt-3 text-slate-500">
          Manage your account information.
        </p>

        <form
          onSubmit={
            handleSubmit
          }
          className="mt-10 space-y-6"
        >
          {/* NAME */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Name
            </label>

            <input
              value={
                form.name
              }
              onChange={(
                e
              ) =>
                setForm({
                  ...form,

                  name:
                    e.target
                      .value,
                })
              }
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-slate-200
                px-5
                outline-none
              "
            />
          </div>

          {/* EMAIL */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>

            <input
              value={
                profile?.email ||
                ""
              }
              disabled
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-slate-100
                px-5
                text-slate-500
              "
            />
          </div>

          {/* UNIVERSITY */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              University
            </label>

            <input
              value={
                form.university
              }
              onChange={(
                e
              ) =>
                setForm({
                  ...form,

                  university:
                    e.target
                      .value,
                })
              }
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-slate-200
                px-5
                outline-none
              "
            />
          </div>

          {/* BIO */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Bio
            </label>

            <textarea
              value={
                form.bio
              }
              onChange={(
                e
              ) =>
                setForm({
                  ...form,

                  bio:
                    e.target
                      .value,
                })
              }
              rows={5}
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-5
                py-4
                outline-none
              "
            />
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={
              saving
            }
            className="
              rounded-2xl
              bg-blue-600
              px-8
              py-4
              font-semibold
              text-white
            "
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
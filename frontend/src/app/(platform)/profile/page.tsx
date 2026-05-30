"use client";

/**
 * User profile page.
 */

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  university: string | null;
  bio: string | null;
  createdAt: string;
}

export default function ProfilePage() {
  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({
      name: "",
      university: "",
      bio: "",
    });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response =
          await fetch("/api/profile");

        const data =
          await response.json();

        setProfile(data);

        setForm({
          name: data.name || "",
          university:
            data.university || "",
          bio: data.bio || "",
        });
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setSaving(true);

      const response =
        await fetch("/api/profile", {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body:
            JSON.stringify(form),
        });

      const result =
        await response.json();

      if (!response.ok) {
        toast.error(result.error);
        return;
      }

      setProfile(result);

      toast.success(
        "Profile updated"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  const initials =
    profile?.name
      ?.split(" ")
      .map((word) =>
        word[0]?.toUpperCase()
      )
      .slice(0, 2)
      .join("") || "U";

  const profileCompletion =
    [
      profile?.name,
      profile?.email,
      profile?.university,
      profile?.bio,
    ].filter(Boolean).length * 25;

  const joinedDate = profile
    ? new Date(
        profile.createdAt
      ).toLocaleDateString(
        "en-US",
        {
          month: "long",
          year: "numeric",
        }
      )
    : "";

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* HERO */}

      <Card className="overflow-hidden">
        <div
          className="
            bg-gradient-to-r
            from-blue-600
            via-indigo-600
            to-purple-600
            px-8
            py-12
            text-white
          "
        >
          <div className="flex flex-col items-center text-center">
            <div
              className="
                flex
                h-32
                w-32
                items-center
                justify-center
                rounded-full
                border-4
                border-white/30
                bg-white/20
                text-4xl
                font-black
                backdrop-blur
              "
            >
              {initials}
            </div>

            <h1 className="mt-6 text-4xl font-black">
              {profile?.name}
            </h1>

            <div
              className="
                mt-3
                rounded-full
                bg-white/20
                px-4
                py-2
                text-sm
                font-semibold
                backdrop-blur
              "
            >
              {profile?.university ||
                "University not set"}
            </div>

            <p className="mt-4 text-white/80">
              Member since {joinedDate}
            </p>
          </div>
        </div>
      </Card>

      {/* STATS */}

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6 text-center">
          <h3 className="text-sm font-semibold text-slate-500">
            Profile Completion
          </h3>

          <p className="mt-3 text-4xl font-black text-blue-600">
            {profileCompletion}%
          </p>
        </Card>

        <Card className="p-6 text-center">
          <h3 className="text-sm font-semibold text-slate-500">
            University
          </h3>

          <p className="mt-3 text-lg font-bold text-slate-900">
            {profile?.university ||
              "Not Set"}
          </p>
        </Card>

        <Card className="p-6 text-center">
          <h3 className="text-sm font-semibold text-slate-500">
            Status
          </h3>

          <p className="mt-3 text-lg font-bold text-green-600">
            Active
          </p>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* ABOUT */}

        <Card className="p-8 lg:col-span-2">
          <h2 className="text-2xl font-black text-slate-900">
            About Me
          </h2>

          <p className="mt-6 leading-relaxed text-slate-600">
            {profile?.bio?.trim()
              ? profile.bio
              : "No bio added yet. Tell other students a little about yourself."}
          </p>

          <div className="mt-8 border-t pt-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Email
                </p>

                <p className="mt-1 text-slate-700">
                  {profile?.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  University
                </p>

                <p className="mt-1 text-slate-700">
                  {profile?.university ||
                    "Not Set"}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* EDIT FORM */}

        <Card className="p-8 lg:col-span-3">
          <h2 className="text-2xl font-black text-slate-900">
            Edit Profile
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Name
              </label>

              <Input
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <Input
                value={
                  profile?.email ||
                  ""
                }
                disabled
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                University
              </label>

              <Input
                value={
                  form.university
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    university:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Bio
              </label>

              <textarea
                rows={6}
                value={form.bio}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bio:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/15
                  bg-white/80
                  px-5
                  py-4
                  text-slate-900
                  shadow-sm
                  outline-none
                  transition-all
                  duration-300
                  focus:border-blue-400
                  focus:ring-4
                  focus:ring-blue-400/20
                "
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
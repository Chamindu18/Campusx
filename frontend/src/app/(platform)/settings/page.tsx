"use client";

/**
 * User account settings page.
 */

import { useEffect } from "react";

import toast from "react-hot-toast";

import {
  useForm,
} from "react-hook-form";

import { Button } from "@/components/ui/Button";

import { Card } from "@/components/ui/Card";

import { Input } from "@/components/ui/Input";

import { Label } from "@/components/ui/Label";

import { useProfile } from "@/hooks/use-profile";

interface SettingsFormValues {
  name: string;

  university: string;

  bio: string;
}

export default function SettingsPage() {
  /**
   * Profile state.
   */
  const {
    profile,
    mutate,
    isLoading,
  } = useProfile();

  /**
   * Form state.
   */
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      isSubmitting,
    },
  } = useForm<SettingsFormValues>();

  /**
   * Sync profile values.
   */
  useEffect(() => {
    if (profile) {
      reset({
        name:
          profile.name || "",

        university:
          profile.university ||
          "",

        bio:
          profile.bio || "",
      });
    }
  }, [profile, reset]);

  /**
   * Save profile.
   */
  async function onSubmit(
    data: SettingsFormValues
  ) {
    try {
      const response =
        await fetch(
          "/api/profile",
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              data
            ),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        toast.error(
          result.error
        );

        return;
      }

      toast.success(
        "Profile updated"
      );

      mutate();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update profile"
      );
    }
  }

  /**
   * Loading.
   */
  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          Account Settings
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Manage your CampusX profile.
        </p>
      </div>

      {/* FORM */}
      <Card
        className="
          mt-12
          border-white/40
          bg-white/70
          p-10
          backdrop-blur-xl
        "
      >
        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-8"
        >
          {/* NAME */}
          <div>
            <Label htmlFor="name">
              Full Name
            </Label>

            <Input
              id="name"
              className="mt-2"
              {...register("name")}
            />
          </div>

          {/* UNIVERSITY */}
          <div>
            <Label htmlFor="university">
              University
            </Label>

            <Input
              id="university"
              className="mt-2"
              {...register(
                "university"
              )}
            />
          </div>

          {/* BIO */}
          <div>
            <Label htmlFor="bio">
              Bio
            </Label>

            <textarea
              id="bio"
              rows={6}
              className="
                mt-2
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white/80
                px-4
                py-4
                text-sm
                outline-none
              "
              {...register("bio")}
            />
          </div>

          {/* EMAIL */}
          <div>
            <Label>
              Email Address
            </Label>

            <Input
              disabled
              value={
                profile?.email ||
                ""
              }
              className="mt-2 opacity-70"
            />
          </div>

          {/* SUBMIT */}
          <div>
            <Button
              type="submit"
              size="lg"
              disabled={
                isSubmitting
              }
            >
              {isSubmitting
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
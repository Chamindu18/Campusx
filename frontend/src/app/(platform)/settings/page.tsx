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
  const {
    profile,
    mutate,
    isLoading,
  } = useProfile();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {
      isSubmitting,
    },
  } =
    useForm<SettingsFormValues>();

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
  }, [
    profile,
    reset,
  ]);

  async function onSubmit(
    data: SettingsFormValues
  ) {
    try {
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
                data
              ),
          }
        );

      const result =
        await response.json();

      if (
        !response.ok
      ) {
        toast.error(
          result.error ||
            "Failed to update profile"
        );

        return;
      }

      toast.success(
        "Profile updated"
      );

      await mutate();
    } catch (
      error
    ) {
      console.error(
        error
      );

      toast.error(
        "Failed to update profile"
      );
    }
  }

  if (
    isLoading
  ) {
    return (
      <div
        className="
          flex
          h-[60vh]
          items-center
          justify-center
        "
      >
        <p
          className="
            text-slate-500
          "
        >
          Loading profile...
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        className="
          flex
          h-[60vh]
          items-center
          justify-center
        "
      >
        <p
          className="
            text-slate-500
          "
        >
          Profile not found.
        </p>
      </div>
    );
  }

  const bioLength =
    watch("bio")?.length ??
    0;

  return (
    <div
      className="
        mx-auto
        max-w-4xl
      "
    >
      {/* HEADER */}

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
          Account Settings
        </h1>

        <p
          className="
            mt-4
            text-lg
            text-slate-600
          "
        >
          Manage your CampusX
          profile and account
          information.
        </p>
      </div>

      {/* FORM */}

      <Card
        className="
          mt-10

          border-white/40

          bg-white/70

          p-5
          md:p-10

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
              {...register(
                "name"
              )}
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
              maxLength={500}
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

                transition

                focus:border-blue-500
              "
              {...register(
                "bio"
              )}
            />

            <p
              className="
                mt-2

                text-xs

                text-slate-500
              "
            >
              {bioLength}/500
              characters
            </p>
          </div>

          {/* EMAIL */}

          <div>
            <Label htmlFor="email">
              Email Address
            </Label>

            <Input
              id="email"
              disabled
              value={
                profile.email ||
                ""
              }
              className="
                mt-2
                opacity-70
              "
            />
          </div>

          {/* ACCOUNT INFO */}

          <div
            className="
              rounded-2xl

              bg-slate-50

              p-5
            "
          >
            <h3
              className="
                font-semibold
                text-slate-900
              "
            >
              Account Information
            </h3>

            <div
              className="
                mt-4

                space-y-2

                text-sm

                text-slate-600
              "
            >
              <p>
                Role:{" "}
                <span className="font-medium">
                  {
                    profile.role
                  }
                </span>
              </p>

              <p>
                Email:{" "}
                <span className="font-medium">
                  {
                    profile.email
                  }
                </span>
              </p>
            </div>
          </div>

          {/* SUBMIT */}

          <div>
            <Button
              type="submit"
              size="lg"
              disabled={
                isSubmitting
              }
              className="w-full sm:w-auto"
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
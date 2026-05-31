"use client";

/**
 * Real signup page connected to backend API.
 */

import Link from "next/link";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import {
  signupSchema,
  type SignupFormValues,
} from "@/lib/validations/auth";

import { AuthCard } from "@/components/ui/AuthCard";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

import {
  getLandingPathForRole,
  getSafeRedirectPath,
} from "@/lib/auth";

export default function SignupPage() {
  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const shouldReduceMotion =
    useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(
      signupSchema
    ),
  });

  async function onSubmit(
    data: SignupFormValues
  ) {
    try {
      const response =
        await fetch(
          "/api/auth/signup",
          {
            method: "POST",

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
          result.error ||
            "Signup failed"
        );

        return;
      }

      toast.success(
        "Account created successfully"
      );

      router.replace(
        getSafeRedirectPath(
          searchParams.get(
            "next"
          ),
          getLandingPathForRole(
            result.user?.role
          )
        )
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong"
      );
    }
  }

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 40,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
      }}
    >
      <AuthCard
        title="Create account"
        description="Join CampusX and connect with your campus marketplace community."
      >
        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="
            space-y-5
            md:space-y-6
          "
        >
          {/* FULL NAME */}

          <div>
            <Label htmlFor="name">
              Full Name
            </Label>

            <Input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              className="mt-2"
              {...register("name")}
            />

            <FormError
              message={
                errors.name?.message
              }
            />
          </div>

          {/* EMAIL */}

          <div>
            <Label htmlFor="email">
              University Email
            </Label>

            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@university.edu"
              className="mt-2"
              {...register("email")}
            />

            <FormError
              message={
                errors.email?.message
              }
            />
          </div>

          {/* PASSWORD */}

          <div>
            <Label htmlFor="password">
              Password
            </Label>

            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              className="mt-2"
              {...register(
                "password"
              )}
            />

            <FormError
              message={
                errors.password
                  ?.message
              }
            />
          </div>

          {/* SUBMIT */}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={
              isSubmitting
            }
          >
            {isSubmitting
              ? "Creating account..."
              : "Create Account"}
          </Button>
        </form>

        {/* FOOTER */}

        <p
          className="
            mt-8

            text-center
            text-sm

            text-slate-600
          "
        >
          Already have an account?{" "}
          <Link
            href="/login"
            className="
              font-medium

              text-blue-600

              transition

              hover:text-blue-700
            "
          >
            Login
          </Link>
        </p>
      </AuthCard>
    </motion.div>
  );
}
"use client";

/**
 * Real login page connected to backend API.
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
  loginSchema,
  type LoginFormValues,
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

export default function LoginPage() {
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
  } = useForm<LoginFormValues>({
    resolver: zodResolver(
      loginSchema
    ),
  });

  async function onSubmit(
    data: LoginFormValues
  ) {
    try {
      const response =
        await fetch(
          "/api/auth/login",
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
            "Login failed"
        );

        return;
      }

      toast.success(
        "Login successful"
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
        title="Welcome back"
        description="Login to continue your CampusX marketplace experience."
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
              autoComplete="current-password"
              placeholder="Enter your password"
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
              ? "Logging in..."
              : "Login"}
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
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="
              font-medium

              text-blue-600

              transition

              hover:text-blue-700
            "
          >
            Create account
          </Link>
        </p>
      </AuthCard>
    </motion.div>
  );
}
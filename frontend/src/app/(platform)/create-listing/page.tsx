"use client";

/**
 * Create marketplace listing page.
 */

import { useState } from "react";

import { motion } from "framer-motion";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import {
  listingSchema,
  type ListingFormValues,
} from "@/lib/validations/listing";

import {
  LISTING_CATEGORIES,
} from "@/constants/listing-categories";

import { Button } from "@/components/ui/Button";

import { Card } from "@/components/ui/Card";

import { FormError } from "@/components/ui/FormError";

import { ImageUpload } from "@/components/ui/ImageUpload";

import { Input } from "@/components/ui/Input";

import { Label } from "@/components/ui/Label";

export default function CreateListingPage() {
  const router =
    useRouter();

  const [
    imageUrls,
    setImageUrls,
  ] =
    useState<string[]>(
      []
    );

  const [
    uploading,
    setUploading,
  ] =
    useState(
      false
    );

  const {
    register,
    handleSubmit,
    reset,

    formState: {
      errors,
      isSubmitting,
    },
  } =
    useForm<ListingFormValues>(
      {
        resolver:
          zodResolver(
            listingSchema
          ),
      }
    );

  async function onSubmit(
    data: ListingFormValues
  ) {
    try {
      if (
        imageUrls.length ===
        0
      ) {
        toast.error(
          "Please upload at least one image"
        );

        return;
      }

      const response =
        await fetch(
          "/api/listings",
          {
            method:
              "POST",

            headers:
              {
                "Content-Type":
                  "application/json",
              },

            body:
              JSON.stringify(
                {
                  ...data,

                  imageUrls,
                }
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
            "Failed to create listing"
        );

        return;
      }

      toast.success(
        "Listing published"
      );

      reset();

      setImageUrls(
        []
      );

      router.push(
        "/marketplace"
      );

      router.refresh();
    } catch (
      error
    ) {
      console.error(
        error
      );

      toast.error(
        "Something went wrong"
      );
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration:
          0.5,
      }}
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
            sm:text-4xl
            md:text-5xl
          "
        >
          Create
          Listing
        </h1>

        <p
          className="
            mt-4
            text-lg
            text-slate-600
          "
        >
          Publish an
          item to the
          campus
          marketplace.
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
          className="
            space-y-8
          "
        >
          {/* TITLE */}
          <div>
            <Label htmlFor="title">
              Listing
              Title
            </Label>

            <Input
              id="title"
              placeholder="MacBook Air M1"
              className="mt-2"
              {...register(
                "title"
              )}
            />

            <FormError
              message={
                errors
                  .title
                  ?.message
              }
            />
          </div>

          {/* CATEGORY */}
          <div>
            <Label htmlFor="category">
              Category
            </Label>

            <select
              id="category"
              {...register(
                "category"
              )}
              className="
                mt-2

                h-14
                w-full

                rounded-2xl

                border
                border-slate-200

                bg-white/80

                px-5

                outline-none
              "
            >
              <option value="">
                Select
                category
              </option>

              {LISTING_CATEGORIES.map(
                (
                  category
                ) => (
                  <option
                    key={
                      category
                    }
                    value={
                      category
                    }
                  >
                    {
                      category
                    }
                  </option>
                )
              )}
            </select>

            <FormError
              message={
                errors
                  .category
                  ?.message
              }
            />
          </div>

          {/* PRICE */}
          <div>
            <Label htmlFor="price">
              Price
            </Label>

            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="25000"
              className="mt-2"
              {...register(
                "price"
              )}
            />

            <FormError
              message={
                errors
                  .price
                  ?.message
              }
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <Label htmlFor="description">
              Description
            </Label>

            <textarea
              id="description"
              rows={6}
              {...register(
                "description"
              )}
              placeholder="Describe your item..."
              className="
                mt-2

                w-full

                rounded-2xl

                border
                border-slate-200

                bg-white/80

                px-5
                py-4

                outline-none
              "
            />

            <FormError
              message={
                errors
                  .description
                  ?.message
              }
            />
          </div>

          {/* IMAGES */}
          <div>
            <Label>
              Images
            </Label>

            <div className="mt-4">
              <ImageUpload
                value={
                  imageUrls
                }
                disabled={
                  uploading
                }
                onChange={
                  setImageUrls
                }
                onUploadStart={() =>
                  setUploading(
                    true
                  )
                }
                onUploadComplete={() =>
                  setUploading(
                    false
                  )
                }
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={
              uploading ||
              isSubmitting
            }
            className="
              w-full
            "
          >
            Publish
            Listing
          </Button>
        </form>
      </Card>
    </motion.div>
  );
}
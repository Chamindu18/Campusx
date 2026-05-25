"use client";

/**
 * Create dorm listing page.
 */

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import {
  dormSchema,
  type DormFormValues,
} from "@/lib/validations/dorm";

import {
  Card,
} from "@/components/ui/Card";

import {
  Input,
} from "@/components/ui/Input";

import {
  Button,
} from "@/components/ui/Button";

import {
  Label,
} from "@/components/ui/Label";

import {
  ImageUpload,
} from "@/components/ui/ImageUpload";

/**
 * Sri Lankan universities.
 */
const universities = [
  "NSBM",
  "SLIIT",
  "UCSC",
  "University of Moratuwa",
  "University of Colombo",
  "University of Kelaniya",
  "University of Peradeniya",
  "University of Ruhuna",
  "Rajarata University",
  "Wayamba University",
  "Other",
];

/**
 * Facilities options.
 */
const facilitiesOptions = [
  "WiFi",
  "Laundry",
  "Kitchen",
  "Parking",
  "Attached Bathroom",
  "Study Area",
  "Security",
  "Water Included",
];

export default function CreateDormPage() {
  const router =
    useRouter();

  /**
   * Uploaded images.
   */
  const [
    imageUrls,
    setImageUrls,
  ] = useState<string[]>(
    []
  );

  /**
   * Selected facilities.
   */
  const [
    facilities,
    setFacilities,
  ] = useState<string[]>(
    []
  );

  /**
   * Upload loading.
   */
  const [
    uploading,
    setUploading,
  ] = useState(false);

  const [
    selectedUniversity,
    setSelectedUniversity,
  ] = useState("");

const [
    customUniversity,
    setCustomUniversity,
  ] = useState("");

  /**
   * React Hook Form.
   */
  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
      isSubmitting,
    },
  } =
    useForm<DormFormValues>({
      defaultValues: {
        facilities: [],
        imageUrls: [],
      },

      resolver:
        zodResolver(
          dormSchema
        ),
    });

  /**
   * Toggle facilities.
   */
  function toggleFacility(
    facility: string
  ) {
    setFacilities(
      (prev) =>
        prev.includes(
          facility
        )
          ? prev.filter(
              (item) =>
                item !==
                facility
            )
          : [
              ...prev,
              facility,
            ]
    );
  }

  /**
   * Submit form.
   */
  async function onSubmit(
    data: DormFormValues
  ) {
    try {
      /**
       * Require images.
       */
      if (
        imageUrls.length ===
        0
      ) {
        toast.error(
          "Upload at least one image"
        );

        return;
      }

      /**
       * Require facilities.
       */
      if (
        facilities.length ===
        0
      ) {
        toast.error(
          "Select at least one facility"
        );

        return;
      }

      /**
       * Create request.
       */
      const response =
        await fetch(
          "/api/dorms",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              {
                ...data,

                facilities,

                imageUrls,
              }
            ),
          }
        );

      const result =
        await response.json();

      /**
       * Error.
       */
      if (
        !response.ok
      ) {
        toast.error(
          result.error
        );

        return;
      }

      /**
       * Success.
       */
      toast.success(
        "Dorm created successfully"
      );

      router.push(
        "/dorms"
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
    <div className="mx-auto max-w-5xl">
      {/* HEADER */}
      <div>
        <h1 className="text-5xl font-black tracking-tight text-slate-900">
          Create Dorm Listing
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Help students find safe and affordable boarding places.
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
          {/* TITLE */}
          <div>
            <Label>
              Dorm Title
            </Label>

            <Input
              placeholder="Boys boarding near NSBM"
              className="mt-2"
              {...register(
                "title"
              )}
            />

            {errors.title && (
              <p className="mt-2 text-sm text-red-500">
                {
                  errors
                    .title
                    .message
                }
              </p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <Label>
              Description
            </Label>

            <textarea
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
              placeholder="Describe the dorm..."
              {...register(
                "description"
              )}
            />

            {errors.description && (
              <p className="mt-2 text-sm text-red-500">
                {
                  errors
                    .description
                    .message
                }
              </p>
            )}
          </div>

          {/* UNIVERSITY */}
          <div>
            <Label>
              University
            </Label>

            <select
              value={selectedUniversity}
              onChange={(e) => {
                const value =
                  e.target.value;

                setSelectedUniversity(
                  value
                );

                setValue(
                  "university",
                  value ===
                    "Other"
                    ? ""
                    : value
                );
              }}
              className="
                mt-2
                h-12
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white/80
                px-4
                text-sm
                outline-none
              "
            >
              <option value="">
                Select university
              </option>

              {universities.map(
                (
                  university
                ) => (
                  <option
                    key={
                      university
                    }
                    value={
                      university
                    }
                  >
                    {
                      university
                    }
                  </option>
                )
              )}
            </select>

            {selectedUniversity ===
              "Other" && (
              <Input
                className="mt-4"
                placeholder="Enter university name"
                value={
                  customUniversity
                }
                onChange={(e) => {
                  setCustomUniversity(
                    e.target
                      .value
                  );

                  setValue(
                    "university",
                    e.target
                      .value
                  );
                }}
              />
            )}

            {errors.university && (
              <p className="mt-2 text-sm text-red-500">
                {
                  errors
                    .university
                    ?.message
                }
              </p>
            )}
          </div>

          {/* CITY */}
          <div>
            <Label>
              City
            </Label>

            <Input
              placeholder="Homagama"
              className="mt-2"
              {...register(
                "city"
              )}
            />
          </div>

          {/* GENDER + ROOM */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Gender */}
            <div>
              <Label>
                Gender
              </Label>

              <select
                className="
                  mt-2
                  h-12
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white/80
                  px-4
                  text-sm
                  outline-none
                "
                {...register(
                  "gender"
                )}
              >
                <option value="">
                  Select gender
                </option>

                <option value="Boys">
                  Boys
                </option>

                <option value="Girls">
                  Girls
                </option>

                <option value="Mixed">
                  Mixed
                </option>
              </select>
            </div>

            {/* Room Type */}
            <div>
              <Label>
                Room Type
              </Label>

              <select
                className="
                  mt-2
                  h-12
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white/80
                  px-4
                  text-sm
                  outline-none
                "
                {...register(
                  "roomType"
                )}
              >
                <option value="">
                  Select room type
                </option>

                <option value="Private">
                  Private
                </option>

                <option value="Shared">
                  Shared
                </option>
              </select>
            </div>
          </div>

          {/* PRICE + CONTACT */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Price */}
            <div>
              <Label>
                Monthly Price
              </Label>

              <Input
                type="number"
                placeholder="15000"
                className="mt-2"
                {...register(
                  "price"
                )}
              />
            </div>

            {/* Contact */}
            <div>
              <Label>
                Contact Number
              </Label>

              <Input
                placeholder="0771234567"
                className="mt-2"
                {...register(
                  "contactNumber"
                )}
              />
            </div>
          </div>

          {/* DISTANCE */}
          <div>
            <Label>
              Distance From University
            </Label>

            <Input
              placeholder="500m from NSBM"
              className="mt-2"
              {...register(
                "distanceFromUniversity"
              )}
            />
          </div>

          {/* FACILITIES */}
          <div>
            <Label>
              Facilities
            </Label>

            <div className="mt-4 flex flex-wrap gap-3">
              {facilitiesOptions.map(
                (
                  facility
                ) => {
                  const active =
                    facilities.includes(
                      facility
                    );

                  return (
                    <button
                      type="button"
                      key={
                        facility
                      }
                      onClick={() =>
                        toggleFacility(
                          facility
                        )
                      }
                      className={`
                        rounded-full
                        px-4
                        py-2
                        text-sm
                        font-medium
                        transition
                        ${
                          active
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }
                      `}
                    >
                      {
                        facility
                      }
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* IMAGES */}
          <div>
            <Label>
              Dorm Images
            </Label>

            <div className="mt-4">
              <ImageUpload
                value={
                  imageUrls
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

          {/* SUBMIT */}
          <Button
            type="submit"
            size="lg"
            disabled={
              isSubmitting ||
              uploading
            }
            className="w-full"
          >
            {isSubmitting
              ? "Creating..."
              : "Create Dorm Listing"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
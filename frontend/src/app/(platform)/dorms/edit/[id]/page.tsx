"use client";

/**
 * Edit dorm page.
 */

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
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
 * Universities.
 */
const universities = [
  "NSBM",
  "SLIIT",
  "UCSC",
  "University of Moratuwa",
  "University of Colombo",
  "University of Kelaniya",
  "University of Peradeniya",
];

/**
 * Facilities.
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

export default function EditDormPage() {
  /**
   * Router.
   */
  const router =
    useRouter();

  /**
   * Params.
   */
  const params =
    useParams();

  const dormId =
    params.id as string;

  /**
   * Uploading state.
   */
  const [
    uploading,
    setUploading,
  ] = useState(false);

  /**
   * Images.
   */
  const [
    imageUrls,
    setImageUrls,
  ] = useState<string[]>(
    []
  );

  /**
   * Facilities.
   */
  const [
    facilities,
    setFacilities,
  ] = useState<string[]>(
    []
  );

  /**
   * Loading.
   */
  const [
    loading,
    setLoading,
  ] = useState(true);

  /**
   * Form.
   */
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } =
    useForm<DormFormValues>({
      resolver:
        zodResolver(
          dormSchema
        ),
    });

  /**
   * Toggle facility.
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
   * Fetch dorm.
   */
  useEffect(() => {
    async function fetchDorm() {
      try {
        const response =
          await fetch(
            `/api/dorms/${dormId}`
          );

        const dorm =
          await response.json();

        reset({
          title:
            dorm.title,

          description:
            dorm.description,

          university:
            dorm.university,

          city:
            dorm.city,

          gender:
            dorm.gender,

          roomType:
            dorm.roomType,

          price:
            dorm.price,

          contactNumber:
            dorm.contactNumber,

          distanceFromUniversity:
            dorm.distanceFromUniversity,

          imageUrls:
            dorm.imageUrls,

          facilities:
            dorm.facilities,
        });

        setImageUrls(
          dorm.imageUrls ||
            []
        );

        setFacilities(
          dorm.facilities ||
            []
        );
      } catch (
        error
      ) {
        console.error(
          error
        );

        toast.error(
          "Failed to load dorm"
        );
      } finally {
        setLoading(
          false
        );
      }
    }

    if (
      dormId
    ) {
      fetchDorm();
    }
  }, [
    dormId,
    reset,
  ]);

  /**
   * Submit update.
   */
  async function onSubmit(
    data: DormFormValues
  ) {
    try {
      const response =
        await fetch(
          `/api/dorms/${dormId}`,
          {
            method:
              "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              {
                ...data,

                imageUrls,

                facilities,
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
          result.error
        );

        return;
      }

      toast.success(
        "Dorm updated successfully"
      );

      router.push(
        "/dashboard/my-dorms"
      );

      router.refresh();
    } catch (
      error
    ) {
      console.error(
        error
      );

      toast.error(
        "Failed to update dorm"
      );
    }
  }

  /**
   * Loading UI.
   */
  if (
    loading
  ) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-slate-500">
          Loading dorm...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          Edit Dorm
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Update your dorm listing information.
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
                "university"
              )}
            >
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
          </div>

          {/* CITY */}
          <div>
            <Label>
              City
            </Label>

            <Input
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

            {/* Room */}
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
            <div>
              <Label>
                Monthly Price
              </Label>

              <Input
                type="number"
                className="mt-2"
                {...register(
                  "price"
                )}
              />
            </div>

            <div>
              <Label>
                Contact Number
              </Label>

              <Input
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
                      key={
                        facility
                      }
                      type="button"
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
              ? "Updating..."
              : "Update Dorm"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
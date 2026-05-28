"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import {
  useParams,
} from "next/navigation";

import Link from "next/link";

import {
  MapPin,
  GraduationCap,
  BedDouble,
  Phone,
  MessageCircle,
} from "lucide-react";

/* ===================================================== */
/* TYPES */
/* ===================================================== */

interface Dorm {
  id: string;

  title: string;

  city: string;

  university: string;

  gender: string;

  roomType: string;

  description: string;

  contactNumber: string;

  price: number;

  imageUrls?: string[];

  facilities?: string[];
}

/* ===================================================== */
/* PAGE */
/* ===================================================== */

export default function DormDetailPage() {
  const params =
    useParams();

  const dormId =
    params.id as string;

  const [
    dorm,
    setDorm,
  ] =
    useState<Dorm | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] =
    useState(
      true
    );

  /* ===================================================== */
  /* FETCH DORM */
  /* ===================================================== */

  useEffect(() => {
    async function fetchDorm() {
      try {
        const response =
          await fetch(
            `/api/dorms/${dormId}`
          );

        const data: Dorm =
          await response.json();

        setDorm(
          data
        );
      } catch (
        error: unknown
      ) {
        console.error(
          error
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
  }, [dormId]);

  /* ===================================================== */
  /* LOADING */
  /* ===================================================== */

  if (
    loading
  ) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  /* ===================================================== */
  /* NOT FOUND */
  /* ===================================================== */

  if (!dorm) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Dorm not found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-10 xl:grid-cols-2">
        {/* IMAGES */}

        <div className="space-y-4">
          {dorm.imageUrls?.map(
            (
              image
            ) => (
              <div
                key={
                  image
                }
                className="
                  relative
                  h-[260px]
                  overflow-hidden
                  rounded-3xl
                  lg:h-[420px]
                "
              >
                <Image
                  src={image}
                  alt={
                    dorm.title
                  }
                  fill
                  className="object-cover"
                />
              </div>
            )
          )}
        </div>

        {/* CONTENT */}

        <div>
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-5xl font-black">
                {
                  dorm.title
                }
              </h1>

              <div className="mt-5 flex items-center gap-2 text-slate-500">
                <MapPin />

                {
                  dorm.city
                }
              </div>
            </div>

            <div className="w-fit rounded-full bg-blue-100 px-5 py-3 font-semibold text-blue-700">
              {
                dorm.gender
              }
            </div>

            <div>
              <p className="text-5xl font-black">
                LKR{" "}
                {dorm.price?.toLocaleString()}
              </p>

              <p className="mt-2 text-slate-500">
                per month
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex gap-3">
                <GraduationCap />

                <span>
                  {
                    dorm.university
                  }
                </span>
              </div>

              <div className="flex gap-3">
                <BedDouble />

                <span>
                  {
                    dorm.roomType
                  }
                </span>
              </div>
            </div>

            <div className="rounded-3xl border p-8">
              <h2 className="text-2xl font-black">
                Description
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                {
                  dorm.description
                }
              </p>
            </div>

            {!!dorm
              .facilities
              ?.length && (
              <div>
                <h2 className="mb-5 text-2xl font-black">
                  Facilities
                </h2>

                <div className="flex flex-wrap gap-3">
                  {dorm.facilities.map(
                    (
                      facility
                    ) => (
                      <div
                        key={
                          facility
                        }
                        className="
                          rounded-full
                          border
                          px-5
                          py-3
                        "
                      >
                        {
                          facility
                        }
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* ACTIONS */}

            <div className="flex flex-wrap gap-4">
              <Link
                href={`tel:${dorm.contactNumber}`}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-blue-600
                  px-6
                  py-4
                  text-white
                "
              >
                <Phone />

                Call
              </Link>

              <Link
                href={`https://wa.me/${dorm.contactNumber}`}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  px-6
                  py-4
                "
              >
                <MessageCircle />

                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
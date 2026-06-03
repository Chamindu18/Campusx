"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { useParams } from "next/navigation";

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
    useState(true);

  const [
    error,
    setError,
  ] =
    useState(false);

  /* ===================================================== */
  /* FETCH DORM */
  /* ===================================================== */

  useEffect(() => {
    async function fetchDorm() {
      try {
        setLoading(true);
        setError(false);

        const response =
          await fetch(
            `/api/dorms/${dormId}`
          );

        if (
          !response.ok
        ) {
          throw new Error(
            "Failed to fetch dorm"
          );
        }

        const data: Dorm =
          await response.json();

        setDorm(data);
      } catch (
        err
      ) {
        console.error(
          err
        );

        setError(true);
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div
        className="
          flex
          h-[70vh]
          items-center
          justify-center
        "
      >
        <div
          className="
            text-lg
            text-slate-500
          "
        >
          Loading dorm...
        </div>
      </div>
    );
  }

  /* ===================================================== */
  /* ERROR */
  /* ===================================================== */

  if (error) {
    return (
      <div
        className="
          flex
          h-[70vh]
          items-center
          justify-center
        "
      >
        <div
          className="
            rounded-3xl
            bg-white/70
            p-8
            text-center
          "
        >
          <h2
            className="
              text-2xl
              font-bold
              text-red-600
            "
          >
            Failed to load dorm
          </h2>

          <p
            className="
              mt-3
              text-slate-500
            "
          >
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  /* ===================================================== */
  /* NOT FOUND */
  /* ===================================================== */

  if (!dorm) {
    return (
      <div
        className="
          flex
          h-[70vh]
          items-center
          justify-center
        "
      >
        <div
          className="
            rounded-3xl
            bg-white/70
            p-8
            text-center
          "
        >
          <h2
            className="
              text-2xl
              font-bold
            "
          >
            Dorm not found
          </h2>
        </div>
      </div>
    );
  }

  const images =
    dorm.imageUrls?.length
      ? dorm.imageUrls
      : ["/placeholder.jpg"];

  const whatsappNumber =
    dorm.contactNumber.replace(
      /\D/g,
      ""
    );

  return (
    <div
      className="
        mx-auto
        max-w-7xl
      "
    >
      <div
        className="
          grid
          gap-10
          xl:grid-cols-2
        "
      >
        {/* IMAGES */}

        <div className="space-y-4">
          {images.map(
            (
              image,
              index
            ) => (
              <div
                key={`${image}-${index}`}
                className="
                  relative

                  h-[240px]
                  sm:h-[300px]
                  lg:h-[420px]

                  overflow-hidden
                  rounded-3xl

                  bg-slate-100
                "
              >
                <Image
                  src={image}
                  alt={
                    dorm.title
                  }
                  fill
                  sizes="(max-width: 1280px) 100vw, 50vw"
                  className="
                    object-cover
                  "
                />
              </div>
            )
          )}
        </div>

        {/* CONTENT */}

        <div>
          <div className="flex flex-col gap-6">
            {/* TITLE */}

            <div>
              <h1
                className="
                  break-words

                  text-3xl
                  font-black

                  sm:text-4xl
                  md:text-5xl
                "
              >
                {dorm.title}
              </h1>

              <div
                className="
                  mt-5

                  flex
                  items-center
                  gap-2

                  text-slate-500
                "
              >
                <MapPin className="h-5 w-5 shrink-0" />

                <span>
                  {dorm.city}
                </span>
              </div>
            </div>

            {/* GENDER */}

            <div
              className="
                w-fit

                rounded-full

                bg-blue-100

                px-5
                py-3

                font-semibold

                text-blue-700
              "
            >
              {dorm.gender}
            </div>

            {/* PRICE */}

            <div>
              <p
                className="
                  text-4xl
                  font-black

                  sm:text-5xl
                "
              >
                LKR{" "}
                {dorm.price.toLocaleString()}
              </p>

              <p
                className="
                  mt-2
                  text-slate-500
                "
              >
                per month
              </p>
            </div>

            {/* DETAILS */}

            <div className="space-y-5">
              <div
                className="
                  flex
                  items-start
                  gap-3
                "
              >
                <GraduationCap className="mt-1 h-5 w-5 shrink-0" />

                <span className="break-words">
                  {dorm.university}
                </span>
              </div>

              <div
                className="
                  flex
                  items-start
                  gap-3
                "
              >
                <BedDouble className="mt-1 h-5 w-5 shrink-0" />

                <span>
                  {dorm.roomType}
                </span>
              </div>
            </div>

            {/* DESCRIPTION */}

            <div
              className="
                rounded-3xl

                border
                border-slate-200

                bg-white

                p-6
                md:p-8
              "
            >
              <h2
                className="
                  text-2xl
                  font-black
                "
              >
                Description
              </h2>

              <p
                className="
                  mt-5

                  whitespace-pre-wrap

                  leading-8

                  text-slate-600
                "
              >
                {dorm.description}
              </p>
            </div>

            {/* FACILITIES */}

            {!!dorm.facilities?.length && (
              <div>
                <h2
                  className="
                    mb-5

                    text-2xl
                    font-black
                  "
                >
                  Facilities
                </h2>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-3
                  "
                >
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
                          border-slate-200

                          px-5
                          py-3

                          text-sm
                          font-medium
                        "
                      >
                        {facility}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* ACTIONS */}

            <div
              className="
                flex
                flex-col
                gap-4

                sm:flex-row
              "
            >
              <Link
                href={`tel:${dorm.contactNumber}`}
                className="
                  flex
                  flex-1

                  items-center
                  justify-center

                  gap-2

                  rounded-2xl

                  bg-blue-600

                  px-6
                  py-4

                  font-semibold

                  text-white
                "
              >
                <Phone className="h-5 w-5" />

                Call
              </Link>

              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={`https://wa.me/${whatsappNumber}`}
                className="
                  flex
                  flex-1

                  items-center
                  justify-center

                  gap-2

                  rounded-2xl

                  border
                  border-slate-300

                  px-6
                  py-4

                  font-semibold
                "
              >
                <MessageCircle className="h-5 w-5" />

                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
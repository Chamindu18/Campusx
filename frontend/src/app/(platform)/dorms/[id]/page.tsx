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

export default function DormDetailPage() {
  /**
   * Route params.
   */
  const params =
    useParams();

  const dormId =
    params.id as string;

  /**
   * Dorm state.
   */
  const [
    dorm,
    setDorm,
  ] = useState<any>(
    null
  );

  /**
   * Loading state.
   */
  const [
    loading,
    setLoading,
  ] = useState(true);

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

        const result =
          await response.json();

        setDorm(
          result
        );
      } catch (
        error
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

  /**
   * Not found.
   */
  if (!dorm) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-slate-500">
          Dorm not found
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-10 xl:grid-cols-2">
        {/* ================================= */}
        {/* IMAGES */}
        {/* ================================= */}

        <div>
          <div className="grid gap-4">
            {dorm.imageUrls.map(
              (
                image: string
              ) => (
                <div
                  key={image}
                  className="
                    relative
                    h-[250px]
                    overflow-hidden
                    rounded-3xl
                    sm:h-[320px]
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
        </div>

        {/* ================================= */}
        {/* CONTENT */}
        {/* ================================= */}

        <div>
          {/* Header */}
          <div
            className="
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-start
              sm:justify-between
            "
          >
            <div>
              <h1
                className="
                  text-3xl
                  font-black
                  tracking-tight
                  text-slate-900
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                {dorm.title}
              </h1>

              <div
                className="
                  mt-4
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-slate-500
                  sm:text-base
                "
              >
                <MapPin className="h-5 w-5" />

                <span>
                  {dorm.city}
                </span>
              </div>
            </div>

            <div
              className="
                w-fit
                rounded-full
                bg-blue-100
                px-5
                py-3
                text-sm
                font-semibold
                text-blue-700
              "
            >
              {dorm.gender}
            </div>
          </div>

          {/* Price */}
          <div className="mt-8">
            <p
              className="
                text-4xl
                font-black
                text-slate-900
                sm:text-5xl
              "
            >
              LKR{" "}
              {dorm.price.toLocaleString()}
            </p>

            <p className="mt-2 text-slate-500">
              per month
            </p>
          </div>

          {/* Meta */}
          <div className="mt-10 space-y-5">
            <div
              className="
                flex
                items-start
                gap-3
                text-slate-700
              "
            >
              <GraduationCap className="mt-0.5 h-5 w-5 shrink-0" />

              <span className="break-words">
                {
                  dorm.university
                }
              </span>
            </div>

            <div
              className="
                flex
                items-start
                gap-3
                text-slate-700
              "
            >
              <BedDouble className="mt-0.5 h-5 w-5 shrink-0" />

              <span>
                {
                  dorm.roomType
                }
              </span>
            </div>

            <div
              className="
                flex
                items-start
                gap-3
                text-slate-700
              "
            >
              <MapPin className="mt-0.5 h-5 w-5 shrink-0" />

              <span className="break-words">
                {
                  dorm.distanceFromUniversity
                }
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-12">
            <h2
              className="
                text-2xl
                font-bold
                text-slate-900
              "
            >
              Description
            </h2>

            <p
              className="
                mt-5
                break-words
                leading-8
                text-slate-600
              "
            >
              {
                dorm.description
              }
            </p>
          </div>

          {/* Facilities */}
          <div className="mt-12">
            <h2
              className="
                text-2xl
                font-bold
                text-slate-900
              "
            >
              Facilities
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              {dorm.facilities.map(
                (
                  facility: string
                ) => (
                  <div
                    key={
                      facility
                    }
                    className="
                      rounded-full
                      bg-slate-100
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-slate-700
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

          {/* OWNER CARD */}
          <div
            className="
              mt-12
              rounded-3xl
              border
              border-white/40
              bg-white/70
              p-6
              backdrop-blur-xl
              sm:p-8
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                text-slate-900
              "
            >
              Owner Information
            </h2>

            <p className="mt-5 text-slate-600">
              Posted by{" "}
              <span className="font-semibold">
                {
                  dorm.user
                    .name
                }
              </span>
            </p>

            {/* ACTIONS */}
            <div
              className="
                mt-8
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:flex-wrap
              "
            >
              {/* CALL */}
              <a
                href={`tel:${dorm.contactNumber}`}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-green-600
                  px-6
                  py-4
                  text-sm
                  font-semibold
                  text-white
                "
              >
                <Phone className="h-5 w-5" />

                Call Owner
              </a>

              {/* WHATSAPP */}
              <a
                href={`https://wa.me/94${dorm.contactNumber.replace(
                  /^0/,
                  ""
                )}`}
                target="_blank"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-emerald-500
                  px-6
                  py-4
                  text-sm
                  font-semibold
                  text-white
                "
              >
                <MessageCircle className="h-5 w-5" />

                WhatsApp
              </a>

              {/* INTERNAL CHAT */}
              <Link
                href={`/messages?userId=${dorm.user.id}`}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-blue-600
                  px-6
                  py-4
                  text-center
                  text-sm
                  font-semibold
                  text-white
                "
              >
                <MessageCircle className="h-5 w-5" />

                Message Inside CampusX
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
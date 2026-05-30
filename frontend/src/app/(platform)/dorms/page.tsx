"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Search,
} from "lucide-react";

import {
  DormCard,
} from "@/components/ui/DormCard";

import {
  DormCardSkeleton,
} from "@/components/ui/DormCardSkeleton";

/* ===================================================== */
/* TYPES */
/* ===================================================== */

interface Dorm {
  id: string;

  title: string;

  university: string;

  city: string;

  gender: string;

  roomType: string;

  price: number;

  imageUrls?: string[];

  /**
   * Optional distance label.
   */
  distanceFromUniversity?: string;
}

/* ===================================================== */
/* CONSTANTS */
/* ===================================================== */

const DEFAULT_UNIVERSITIES = [
  "All",
];

const roomTypes = [
  "",
  "Private",
  "Shared",
];

/* ===================================================== */
/* PAGE */
/* ===================================================== */

export default function DormsPage() {
  const [
    dorms,
    setDorms,
  ] =
    useState<Dorm[]>(
      []
    );

  const [
    loading,
    setLoading,
  ] =
    useState(
      true
    );

  const [
    search,
    setSearch,
  ] =
    useState("");

  const [
    university,
    setUniversity,
  ] =
    useState("All");

  const [
    city,
    setCity,
  ] =
    useState("");

  const [
    gender,
    setGender,
  ] =
    useState("");

  const [
    roomType,
    setRoomType,
  ] =
    useState("");

  const [
    maxPrice,
    setMaxPrice,
  ] =
    useState("");

  const [
    universities,
    setUniversities,
  ] =
    useState<string[]>(
      DEFAULT_UNIVERSITIES
    );

  /* ===================================================== */
  /* FETCH DORMS */
  /* ===================================================== */

  useEffect(() => {
    async function fetchDorms() {
      try {
        setLoading(
          true
        );

        const params =
          new URLSearchParams();

        if (search) {
          params.append(
            "search",
            search
          );
        }

        if (
          university !==
          "All"
        ) {
          params.append(
            "university",
            university
          );
        }

        if (city) {
          params.append(
            "city",
            city
          );
        }

        if (gender) {
          params.append(
            "gender",
            gender
          );
        }

        if (
          roomType
        ) {
          params.append(
            "roomType",
            roomType
          );
        }

        if (
          maxPrice
        ) {
          params.append(
            "maxPrice",
            maxPrice
          );
        }

        const response =
          await fetch(
            `/api/dorms?${params.toString()}`
          );

        const data =
          await response.json();

        const dormList:
          Dorm[] =
            data.dorms ||
            [];

        setDorms(
          dormList
        );

        if (
          search === "" &&
          city === "" &&
          gender === "" &&
          roomType === "" &&
          maxPrice === ""
        ) {
          const dynamicUniversities =
            [
              "All",

              ...new Set(
                dormList
                  .map(
                    (
                      dorm
                    ) =>
                      dorm.university
                  )
                  .filter(
                    Boolean
                  )
              ),
            ];

          setUniversities(
            dynamicUniversities
          );
        }
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

    fetchDorms();
  }, [
    search,
    university,
    city,
    gender,
    roomType,
    maxPrice,
  ]);

  return (
    <div>
      {/* HEADER */}

      <h1
        className="
          text-3xl
          font-black
          sm:text-4xl
          md:text-5xl
        "
      >
        Student Dorms
      </h1>

      {/* SEARCH */}

      <div className="mt-10">
        <div
          className="
            flex
            items-center

            rounded-3xl

            border
            border-slate-200

            bg-white

            px-5
            py-5
          "
        >
          <Search />

          <input
            value={
              search
            }
            onChange={(
              e
            ) =>
              setSearch(
                e.target
                  .value
              )
            }
            placeholder="Search dorms..."
            className="
              ml-3
              w-full
              outline-none
            "
          />
        </div>
      </div>

      {/* FILTERS */}

      <div
        className="
          mt-8

          flex
          flex-wrap

          gap-4
        "
      >
        <select
          value={
            university
          }
          onChange={(
            e
          ) =>
            setUniversity(
              e.target
                .value
            )
          }
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-5
            py-3
            w-full
            sm:w-auto
          "
        >
          {universities.map(
            (
              uni
            ) => (
              <option
                key={
                  uni
                }
                value={
                  uni
                }
              >
                {uni}
              </option>
            )
          )}
        </select>

        <input
          value={city}
          onChange={(
            e
          ) =>
            setCity(
              e.target
                .value
            )
          }
          placeholder="City"
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-5
            py-3
            w-full
            sm:w-auto
          "
        />

        <select
          value={
            gender
          }
          onChange={(
            e
          ) =>
            setGender(
              e.target
                .value
            )
          }
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-5
            py-3
            w-full
            sm:w-auto
          "
        >
          <option value="">
            All Genders
          </option>

          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>
        </select>

        <select
          value={
            roomType
          }
          onChange={(
            e
          ) =>
            setRoomType(
              e.target
                .value
            )
          }
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-5
            py-3
            w-full
            sm:w-auto
          "
        >
          {roomTypes.map(
            (
              type
            ) => (
              <option
                key={
                  type
                }
                value={
                  type
                }
              >
                {type ||
                  "All Rooms"}
              </option>
            )
          )}
        </select>

        <input
          type="number"
          value={
            maxPrice
          }
          onChange={(
            e
          ) =>
            setMaxPrice(
              e.target
                .value
            )
          }
          placeholder="Max Price"
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-5
            py-3
            w-full
            sm:w-auto
          "
        />
      </div>

      {/* DORMS */}

      <div
        className="
          mt-12

          grid
          gap-8

          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {loading
          ? Array.from({
              length: 6,
            }).map(
              (
                _,
                index
              ) => (
                <DormCardSkeleton
                  key={
                    index
                  }
                />
              )
            )
          : dorms.map(
              (
                dorm
              ) => (
                <DormCard
                  key={
                    dorm.id
                  }
                  id={
                    dorm.id
                  }
                  title={
                    dorm.title
                  }
                  university={
                    dorm.university
                  }
                  city={
                    dorm.city
                  }
                  gender={
                    dorm.gender
                  }
                  roomType={
                    dorm.roomType
                  }
                  price={
                    dorm.price
                  }
                  imageUrls={
                    dorm.imageUrls ||
                    []
                  }
                  distanceFromUniversity={
                    dorm.distanceFromUniversity ||
                    "Near university"
                  }
                />
              )
            )}
      </div>
    </div>
  );
}
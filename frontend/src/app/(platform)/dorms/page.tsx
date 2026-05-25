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

const universities = [
  "All",
  "NSBM",
  "SLIIT",
  "UCSC",
  "University of Moratuwa",
  "University of Colombo",
  "University of Kelaniya",
  "University of Peradeniya",
];

const roomTypes = [
  "",
  "Private",
  "Shared",
];

export default function DormsPage() {
  const [
    dorms,
    setDorms,
  ] =
    useState<any[]>(
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

  useEffect(() => {
    async function fetchDorms() {
      try {
        setLoading(
          true
        );

        const params =
          new URLSearchParams();

        if (search)
          params.append(
            "search",
            search
          );

        if (
          university !==
          "All"
        )
          params.append(
            "university",
            university
          );

        if (city)
          params.append(
            "city",
            city
          );

        if (gender)
          params.append(
            "gender",
            gender
          );

        if (
          roomType
        )
          params.append(
            "roomType",
            roomType
          );

        if (
          maxPrice
        )
          params.append(
            "maxPrice",
            maxPrice
          );

        const response =
          await fetch(
            `/api/dorms?${params}`
          );

        const data =
          await response.json();

        setDorms(
          data.dorms ||
            []
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
          text-5xl
          font-black
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

          rounded-3xl

          border

          bg-white

          p-6
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
            h-12
            min-w-[180px]
            rounded-2xl
            border
            px-4
          "
        >
          {universities.map(
            (
              item
            ) => (
              <option
                key={
                  item
                }
              >
                {
                  item
                }
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
            h-12
            min-w-[180px]
            rounded-2xl
            border
            px-4
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
            h-12
            min-w-[180px]
            rounded-2xl
            border
            px-4
          "
        >
          <option value="">
            Gender
          </option>

          <option>
            Boys
          </option>

          <option>
            Girls
          </option>

          <option>
            Mixed
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
            h-12
            min-w-[180px]
            rounded-2xl
            border
            px-4
          "
        >
          <option value="">
            Room Type
          </option>

          {roomTypes.map(
            (
              type
            ) =>
              type ? (
                <option
                  key={
                    type
                  }
                >
                  {
                    type
                  }
                </option>
              ) : null
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
            h-12
            w-[180px]
            rounded-2xl
            border
            px-4
          "
        />
      </div>

      {/* CARDS */}
      <div
        className="
          mt-10

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
                i
              ) => (
                <DormCardSkeleton
                  key={
                    i
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
                  {...dorm}
                />
              )
            )}
      </div>
    </div>
  );
}
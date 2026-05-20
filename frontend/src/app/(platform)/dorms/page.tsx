"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import {
  DormCard,
} from "@/components/ui/DormCard";

import { DormCardSkeleton } from "@/components/ui/DormCardSkeleton";

/**
 * Universities.
 */
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

/**
 * Room types.
 */
const roomTypes = [
  "",
  "Private",
  "Shared",
];

export default function DormsPage() {
  /**
   * Dorms state.
   */
  const [
    dorms,
    setDorms,
  ] = useState<any[]>(
    []
  );

  /**
   * Loading state.
   */
  const [
    loading,
    setLoading,
  ] = useState(true);

  /**
   * Mobile filter drawer.
   */
  const [
    filtersOpen,
    setFiltersOpen,
  ] = useState(false);

  /**
   * Filters.
   */
  const [
    search,
    setSearch,
  ] = useState("");

  const [
    university,
    setUniversity,
  ] = useState("All");

  const [
    city,
    setCity,
  ] = useState("");

  const [
    gender,
    setGender,
  ] = useState("");

  const [
    roomType,
    setRoomType,
  ] = useState("");

  const [
    maxPrice,
    setMaxPrice,
  ] = useState("");

  const [
    sort,
    setSort,
  ] = useState("");

  /**
   * Fetch dorms.
   */
  useEffect(() => {
    async function fetchDorms() {
      try {
        setLoading(true);

        const params =
          new URLSearchParams();

        if (
          search
        ) {
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

        if (
          city
        ) {
          params.append(
            "city",
            city
          );
        }

        if (
          gender
        ) {
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

        if (
          sort
        ) {
          params.append(
            "sort",
            sort
          );
        }

        const response =
          await fetch(
            `/api/dorms?${params.toString()}`
          );

        const result =
          await response.json();

        setDorms(
          result.dorms ||
            []
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

    fetchDorms();
  }, [
    search,
    university,
    city,
    gender,
    roomType,
    maxPrice,
    sort,
  ]);

  /**
   * Filter panel component.
   */
  function FiltersPanel() {
    return (
      <div className="space-y-4">
        {/* University */}
        <select
          value={
            university
          }
          onChange={(e) =>
            setUniversity(
              e.target.value
            )
          }
          className="
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
          {universities.map(
            (
              item
            ) => (
              <option
                key={
                  item
                }
                value={
                  item
                }
              >
                {item}
              </option>
            )
          )}
        </select>

        {/* City */}
        <input
          value={city}
          onChange={(e) =>
            setCity(
              e.target.value
            )
          }
          placeholder="City"
          className="
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
        />

        {/* Gender */}
        <select
          value={
            gender
          }
          onChange={(e) =>
            setGender(
              e.target.value
            )
          }
          className="
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
            All Genders
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

        {/* Room Type */}
        <select
          value={
            roomType
          }
          onChange={(e) =>
            setRoomType(
              e.target.value
            )
          }
          className="
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
                  value={
                    type
                  }
                >
                  {type}
                </option>
              ) : null
          )}
        </select>

        {/* Max Price */}
        <input
          type="number"
          value={
            maxPrice
          }
          onChange={(e) =>
            setMaxPrice(
              e.target.value
            )
          }
          placeholder="Max Price"
          className="
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
        />

        {/* Sort */}
        <select
          value={
            sort
          }
          onChange={(e) =>
            setSort(
              e.target.value
            )
          }
          className="
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
            Newest
          </option>

          <option value="price-low">
            Lowest Price
          </option>

          <option value="price-high">
            Highest Price
          </option>
        </select>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Student Dorms
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Find safe and affordable boarding places near your university.
          </p>
        </div>

        {/* MOBILE FILTER BUTTON */}
        <button
          onClick={() =>
            setFiltersOpen(
              true
            )
          }
          className="
            inline-flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-blue-600
            px-5
            py-4
            text-sm
            font-semibold
            text-white
            lg:hidden
          "
        >
          <SlidersHorizontal className="h-5 w-5" />

          Filters
        </button>
      </div>

      {/* SEARCH */}
      <div
        className="
          mt-10
          flex
          items-center
          gap-4
          rounded-3xl
          border
          border-white/40
          bg-white/70
          px-5
          py-5
          shadow-lg
          shadow-slate-200/20
          backdrop-blur-xl
          sm:px-6
        "
      >
        <Search className="h-5 w-5 text-slate-400" />

        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search dorms..."
          className="
            w-full
            bg-transparent
            text-sm
            outline-none
            placeholder:text-slate-400
          "
        />
      </div>

      {/* DESKTOP FILTERS */}
      <div
        className="
          mt-8
          hidden
          rounded-3xl
          border
          border-white/40
          bg-white/70
          p-6
          shadow-lg
          shadow-slate-200/20
          backdrop-blur-xl
          lg:block
        "
      >
        <div className="mb-6 flex items-center gap-3">
          <SlidersHorizontal className="h-5 w-5 text-slate-600" />

          <h2 className="text-lg font-bold text-slate-900">
            Filters
          </h2>
        </div>

        <div className="grid gap-4 xl:grid-cols-6">
          <FiltersPanel />
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {filtersOpen && (
        <>
          {/* OVERLAY */}
          <div
            onClick={() =>
              setFiltersOpen(
                false
              )
            }
            className="
              fixed
              inset-0
              z-40
              bg-black/40
              backdrop-blur-sm
              lg:hidden
            "
          />

          {/* DRAWER */}
          <div
            className="
              fixed
              bottom-0
              left-0
              right-0
              z-50
              max-h-[85vh]
              overflow-y-auto
              rounded-t-[32px]
              bg-white
              p-6
              shadow-2xl
              lg:hidden
            "
          >
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900">
                Filters
              </h2>

              <button
                onClick={() =>
                  setFiltersOpen(
                    false
                  )
                }
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-slate-100
                "
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* FILTERS */}
            <div className="mt-8">
              <FiltersPanel />
            </div>

            {/* ACTION */}
            <button
              onClick={() =>
                setFiltersOpen(
                  false
                )
              }
              className="
                mt-8
                h-14
                w-full
                rounded-2xl
                bg-blue-600
                text-sm
                font-semibold
                text-white
              "
            >
              Apply Filters
            </button>
          </div>
        </>
      )}

      {/* RESULTS */}
      <div className="mt-10 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {dorms.length} dorms found
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <DormCardSkeleton
              key={index}
            />
          ))}
        </div>
      ) : dorms.length ===
        0 ? (
        <div
          className="
            mt-20
            rounded-3xl
            border
            border-dashed
            border-slate-300
            bg-white/50
            p-10
            text-center
            sm:p-16
          "
        >
          <h2 className="text-2xl font-bold text-slate-900">
            No dorms found
          </h2>

          <p className="mt-4 text-slate-500">
            Try changing your filters or search terms.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {dorms.map(
            (dorm) => (
              <DormCard
                key={
                  dorm.id
                }
                {...dorm}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
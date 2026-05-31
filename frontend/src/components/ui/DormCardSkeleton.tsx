export function DormCardSkeleton() {
  return (
    <div
      className="
        animate-pulse
        overflow-hidden
        rounded-3xl
        border
        border-white/40
        bg-white/70
        shadow-lg
        shadow-slate-200/30
        backdrop-blur-xl
      "
    >
      {/* IMAGE */}
      <div className="h-48 bg-slate-200 sm:h-56 md:h-64" />

      {/* CONTENT */}
      <div className="p-5 md:p-6">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            {/* TITLE */}
            <div className="h-6 w-3/4 rounded-lg bg-slate-200" />

            {/* CITY */}
            <div className="mt-3 h-4 w-1/2 rounded-lg bg-slate-200" />
          </div>

          {/* GENDER BADGE */}
          <div className="h-8 w-16 rounded-full bg-slate-200" />
        </div>

        {/* UNIVERSITY */}
        <div className="mt-5 h-4 w-2/3 rounded-lg bg-slate-200" />

        {/* ROOM TYPE */}
        <div className="mt-3 h-4 w-1/2 rounded-lg bg-slate-200" />

        {/* DISTANCE */}
        <div className="mt-4 h-4 w-3/4 rounded-lg bg-slate-200" />

        {/* PRICE */}
        <div className="mt-6 flex items-center justify-between">
          <div className="h-8 w-32 rounded-xl bg-slate-200" />

          <div className="h-4 w-16 rounded-lg bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
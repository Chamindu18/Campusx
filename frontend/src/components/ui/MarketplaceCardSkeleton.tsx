export function MarketplaceCardSkeleton() {
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
        {/* CATEGORY */}

        <div className="h-6 w-24 rounded-full bg-slate-200" />

        {/* TITLE */}

        <div className="mt-5 space-y-2">
          <div className="h-6 w-full rounded-lg bg-slate-200" />

          <div className="h-6 w-3/4 rounded-lg bg-slate-200" />
        </div>

        {/* CONDITION */}

        <div className="mt-5 h-4 w-32 rounded-lg bg-slate-200" />

        {/* LOCATION */}

        <div className="mt-3 h-4 w-40 rounded-lg bg-slate-200" />

        {/* FOOTER */}

        <div className="mt-8 flex items-center justify-between gap-3">
          <div className="h-8 w-28 rounded-xl bg-slate-200" />

          <div className="h-10 w-20 rounded-xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
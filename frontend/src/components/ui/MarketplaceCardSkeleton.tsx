export function MarketplaceCardSkeleton() {
  return (
    <div
      className="
        animate-pulse
        overflow-hidden
        rounded-[32px]
        border
        border-white/40
        bg-white/70
        backdrop-blur-xl
      "
    >
      {/* IMAGE */}
      <div className="h-48 bg-slate-200 sm:h-56 md:h-64" />

      {/* CONTENT */}
      <div className="p-6">
        {/* Category */}
        <div className="h-6 w-24 rounded-full bg-slate-200" />

        {/* Title */}
        <div className="mt-5 h-8 w-3/4 rounded-xl bg-slate-200" />

        {/* Description */}
        <div className="mt-4 space-y-3">
          <div className="h-4 w-full rounded-lg bg-slate-200" />

          <div className="h-4 w-5/6 rounded-lg bg-slate-200" />
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between">
          <div className="h-8 w-24 rounded-xl bg-slate-200" />

          <div className="h-10 w-28 rounded-2xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
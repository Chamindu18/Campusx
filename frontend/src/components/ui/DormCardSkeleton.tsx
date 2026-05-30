export function DormCardSkeleton() {
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
        {/* UNIVERSITY */}
        <div className="h-6 w-28 rounded-full bg-slate-200" />

        {/* TITLE */}
        <div className="mt-5 h-8 w-3/4 rounded-xl bg-slate-200" />

        {/* LOCATION */}
        <div className="mt-4 h-4 w-1/2 rounded-lg bg-slate-200" />

        {/* PRICE */}
        <div className="mt-6 h-8 w-32 rounded-xl bg-slate-200" />

        {/* BUTTON */}
        <div className="mt-8 h-12 w-full rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
}
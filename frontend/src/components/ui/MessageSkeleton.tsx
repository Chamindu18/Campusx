export function MessageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* LEFT MESSAGE */}
      <div className="flex justify-start">
        <div
          className="
            w-[75%]
            rounded-3xl
            bg-slate-200
            px-5
            py-6
          "
        >
          <div className="h-3 w-24 rounded bg-slate-300" />

          <div className="mt-4 h-4 w-full rounded bg-slate-300" />

          <div className="mt-3 h-4 w-5/6 rounded bg-slate-300" />
        </div>
      </div>

      {/* RIGHT MESSAGE */}
      <div className="flex justify-end">
        <div
          className="
            w-[65%]
            rounded-3xl
            bg-slate-200
            px-5
            py-6
          "
        >
          <div className="h-3 w-20 rounded bg-slate-300" />

          <div className="mt-4 h-4 w-full rounded bg-slate-300" />

          <div className="mt-3 h-4 w-4/5 rounded bg-slate-300" />
        </div>
      </div>

      {/* LEFT MESSAGE */}
      <div className="flex justify-start">
        <div
          className="
            w-[70%]
            rounded-3xl
            bg-slate-200
            px-5
            py-6
          "
        >
          <div className="h-3 w-24 rounded bg-slate-300" />

          <div className="mt-4 h-4 w-full rounded bg-slate-300" />
        </div>
      </div>
    </div>
  );
}
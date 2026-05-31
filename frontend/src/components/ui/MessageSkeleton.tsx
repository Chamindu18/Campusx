export function MessageSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* LEFT MESSAGE */}

      <div className="flex justify-start">
        <div
          className="
            max-w-[85%]
            md:max-w-[75%]

            rounded-2xl

            bg-slate-200

            px-4
            md:px-5

            py-3
            md:py-4
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
            max-w-[80%]
            md:max-w-[70%]

            rounded-2xl

            bg-slate-200

            px-4
            md:px-5

            py-3
            md:py-4
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
            max-w-[82%]
            md:max-w-[72%]

            rounded-2xl

            bg-slate-200

            px-4
            md:px-5

            py-3
            md:py-4
          "
        >
          <div className="h-3 w-24 rounded bg-slate-300" />

          <div className="mt-4 h-4 w-full rounded bg-slate-300" />
        </div>
      </div>
    </div>
  );
}
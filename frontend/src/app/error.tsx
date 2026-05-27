"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;

  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-lg rounded-3xl bg-white p-10 text-center">
        <h1 className="text-4xl font-black">
          Something went wrong
        </h1>

        <p className="mt-4 text-slate-500">
          {error.message}
        </p>

        <button
          onClick={
            reset
          }
          className="
            mt-8
            rounded-2xl
            bg-slate-900
            px-6
            py-3
            text-white
          "
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
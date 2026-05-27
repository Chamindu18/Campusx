import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl font-black">
          404
        </h1>

        <p className="mt-4 text-slate-500">
          Page not found
        </p>

        <Link
          href="/dashboard"
          className="
            mt-8
            inline-flex
            rounded-2xl
            bg-slate-900
            px-6
            py-3
            text-white
          "
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
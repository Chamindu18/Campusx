"use client";

import Link from "next/link";

export function CTASection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        py-40
      "
    >
      {/* BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          bg-[url('/images/hero/campus-life.jpg')]
          bg-cover
          bg-center
        "
      />

      {/* OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-black/70
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          mx-auto
          max-w-5xl
          px-6
          text-center
        "
      >
        <p
          className="
            text-sm
            uppercase
            tracking-[0.35em]
            text-blue-300
          "
        >
          Your next semester
        </p>

        <h2
          className="
            mt-8
            text-5xl
            font-black
            leading-tight
            text-white
            md:text-6xl
          "
        >
          Start somewhere.
          <br />
          Campus life will
          figure out the rest.
        </h2>

        <p
          className="
            mx-auto
            mt-10
            max-w-2xl
            text-lg
            leading-9
            text-white/70
          "
        >
          Discover places,
          find essentials,
          and make student life
          feel a little easier.
        </p>

        {/* ACTIONS */}
        <div
          className="
            mt-14
            flex
            flex-wrap
            justify-center
            gap-5
          "
        >
          <Link
            href="/marketplace"
            className="
              rounded-2xl
              bg-white
              px-8
              py-4
              font-semibold
              text-slate-900
              transition
              hover:scale-[1.02]
            "
          >
            Explore Marketplace
          </Link>

          <Link
            href="/dorms"
            className="
              rounded-2xl
              border
              border-white/20
              px-8
              py-4
              font-semibold
              text-white
              transition
              hover:bg-white/10
            "
          >
            Find Dorms
          </Link>
        </div>
      </div>
    </section>
  );
}
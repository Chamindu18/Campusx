"use client";

const principles = [
  {
    title:
      "Student focused",

    description:
      "Built around how students actually discover, move and connect.",
  },

  {
    title:
      "Simple interactions",

    description:
      "Less complexity and fewer steps to find what matters.",
  },

  {
    title:
      "Real connections",

    description:
      "Talk directly and make decisions naturally.",
  },
];

export function SafetySection() {
  return (
    <section
      className="
        bg-white
        py-36
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-6
        "
      >
        {/* HEADER */}
        <div
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >
          <p
            className="
              text-sm
              uppercase
              tracking-[0.35em]
              text-blue-600
            "
          >
            Built For Students
          </p>

          <h2
            className="
              mt-6
              text-5xl
              font-black
              text-slate-900
            "
          >
            Designed to feel
            straightforward.
          </h2>

          <p
            className="
              mx-auto
              mt-8
              max-w-2xl
              text-lg
              leading-9
              text-slate-600
            "
          >
            No unnecessary complexity.
            Just a place that helps
            students find what matters.
          </p>
        </div>

        {/* GRID */}
        <div
          className="
            mt-24
            grid
            gap-8
            md:grid-cols-3
          "
        >
          {principles.map(
            (
              item
            ) => (
              <div
                key={
                  item.title
                }
                className="
                  rounded-[30px]
                  bg-slate-50
                  p-10
                "
              >
                <h3
                  className="
                    text-2xl
                    font-bold
                    text-slate-900
                  "
                >
                  {
                    item.title
                  }
                </h3>

                <p
                  className="
                    mt-5
                    leading-8
                    text-slate-600
                  "
                >
                  {
                    item.description
                  }
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
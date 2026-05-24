"use client";

const steps = [
  {
    number: "01",

    title:
      "Explore",

    description:
      "Browse categories, discover listings and find places that fit student life.",
  },

  {
    number: "02",

    title:
      "Find",

    description:
      "Compare options and discover what works for your needs.",
  },

  {
    number: "03",

    title:
      "Connect",

    description:
      "Reach out directly and make decisions with confidence.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      className="
        relative
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
            Simple Process
          </p>

          <h2
            className="
              mt-6
              text-5xl
              font-black
              text-slate-900
            "
          >
            Three steps.
            Nothing complicated.
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
            Campus life moves quickly.
            Finding what matters should not.
          </p>
        </div>

        {/* STEPS */}
        <div
          className="
            mt-28
            grid
            gap-10
            md:grid-cols-3
          "
        >
          {steps.map(
            (
              step
            ) => (
              <div
                key={
                  step.number
                }
                className="
                  rounded-[32px]
                  bg-slate-50
                  p-10
                "
              >
                <div
                  className="
                    text-sm
                    font-bold
                    text-blue-600
                  "
                >
                  {
                    step.number
                  }
                </div>

                <h3
                  className="
                    mt-6
                    text-3xl
                    font-bold
                    text-slate-900
                  "
                >
                  {
                    step.title
                  }
                </h3>

                <p
                  className="
                    mt-6
                    leading-8
                    text-slate-600
                  "
                >
                  {
                    step.description
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
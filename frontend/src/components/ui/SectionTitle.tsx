/**
 * Reusable section heading component.
 */

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div
      className="
        mx-auto
        max-w-3xl
        text-center
      "
    >
      {/* Title */}

      <h2
        className="
          break-words

          text-3xl
          sm:text-4xl
          md:text-5xl

          font-bold

          tracking-tight

          text-slate-900
        "
      >
        {title}
      </h2>

      {/* Subtitle */}

      {subtitle && (
        <p
          className="
            mt-4
            md:mt-6

            text-base
            md:text-lg

            leading-7
            md:leading-8

            text-slate-600
          "
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
import type {
  ReactNode,
} from "react";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

export function AuthCard({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="px-4">
      {/* HEADER */}
      <div className="text-center">
        <h1
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl

            font-black
            tracking-tight

            text-white

            drop-shadow-lg
          "
        >
          {title}
        </h1>

        <p
          className="
            mx-auto
            mt-5

            max-w-md

            text-base
            md:text-lg

            leading-7
            md:leading-8

            text-white/90
          "
        >
          {description}
        </p>
      </div>

      {/* FORM */}
      <div className="mt-10">
        {children}
      </div>
    </div>
  );
}
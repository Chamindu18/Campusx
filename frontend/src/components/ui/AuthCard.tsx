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
    <div>
      {/* HEADER */}
      <div
        className="
          text-center
        "
      >
        <h1
          className="
            text-5xl
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

            text-lg
            leading-8

            text-white/90
          "
        >
          {description}
        </p>
      </div>

      {/* FORM */}
      <div
        className="
          mt-10
        "
      >
        {children}
      </div>
    </div>
  );
}
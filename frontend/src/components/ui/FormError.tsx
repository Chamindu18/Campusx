interface FormErrorProps {
  message?: string;
}

export function FormError({
  message,
}: FormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p
      role="alert"
      className="
        mt-2

        break-words

        text-sm
        font-medium

        text-red-600
      "
    >
      {message}
    </p>
  );
}
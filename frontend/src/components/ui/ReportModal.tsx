"use client";

/**
 * Listing report modal.
 */

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import { X } from "lucide-react";

interface ReportModalProps {
  listingId: string;
  open: boolean;
  onClose: () => void;
}

const reasons = [
  "Spam",
  "Fake Listing",
  "Scam",
  "Harassment",
  "Inappropriate Content",
  "Other",
];

export function ReportModal({
  listingId,
  open,
  onClose,
}: ReportModalProps) {
  const [reason, setReason] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  /**
   * Reset form when closed.
   */
  useEffect(() => {
    if (!open) {
      setReason("");
      setDescription("");
    }
  }, [open]);

  /**
   * ESC close support.
   */
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (
        event.key === "Escape"
      ) {
        onClose();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/reports",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              listingId,
              reason,
              description,
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        toast.error(
          result.error ??
            "Failed to submit report"
        );

        return;
      }

      toast.success(
        "Report submitted"
      );

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to submit report"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/50

        p-4
        md:p-6
      "
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Report listing"

        onClick={(event) =>
          event.stopPropagation()
        }

        className="
          w-full
          max-w-xl

          max-h-[90vh]
          overflow-y-auto

          rounded-[32px]

          bg-white

          p-5
          md:p-8

          shadow-2xl
        "
      >
        {/* HEADER */}

        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              className="
                text-2xl
                md:text-3xl

                font-black

                text-slate-900
              "
            >
              Report Listing
            </h2>

            <p className="mt-2 text-slate-500">
              Help keep CampusX safe.
            </p>
          </div>

          <button
            type="button"
            aria-label="Close report modal"
            onClick={onClose}
            className="
              flex

              h-11
              w-11

              shrink-0

              items-center
              justify-center

              rounded-2xl

              bg-slate-100

              transition

              hover:bg-slate-200
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* REASONS */}

        <div className="mt-8 flex flex-wrap gap-3">
          {reasons.map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setReason(item)
                }
                className={`
                  rounded-2xl

                  px-5
                  py-3

                  text-sm
                  font-medium

                  transition

                  ${
                    reason === item
                      ? `
                        bg-red-600
                        text-white
                      `
                      : `
                        bg-slate-100
                        text-slate-700
                        hover:bg-slate-200
                      `
                  }
                `}
              >
                {item}
              </button>
            )
          )}
        </div>

        {/* DESCRIPTION */}

        <div className="mt-8">
          <textarea
            rows={5}
            placeholder="Additional details..."
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="
              w-full

              rounded-2xl

              border
              border-slate-200

              px-4
              py-4

              text-sm

              outline-none

              focus:border-red-300
              focus:ring-4
              focus:ring-red-200/50
            "
          />
        </div>

        {/* SUBMIT */}

        <div className="mt-8">
          <button
            type="button"
            disabled={
              !reason ||
              loading
            }
            onClick={
              handleSubmit
            }
            className="
              rounded-2xl

              bg-red-600

              px-6
              py-3

              text-sm
              font-medium

              text-white

              transition

              hover:bg-red-700

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading
              ? "Submitting..."
              : "Submit Report"}
          </button>
        </div>
      </div>
    </div>
  );
}
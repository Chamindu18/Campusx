"use client";

import Image from "next/image";

import {
  UploadButton,
} from "@/lib/uploadthing";

interface UploadedFile {
  url: string;
}

interface ImageUploadProps {
  value: string[];

  onChange: (
    urls: string[]
  ) => void;

  disabled?: boolean;

  onUploadStart?: () => void;

  onUploadComplete?: () => void;
}

export function ImageUpload({
  value,
  onChange,
  disabled = false,
  onUploadStart,
  onUploadComplete,
}: ImageUploadProps) {
  return (
    <div className="space-y-6">
      {/* PREVIEW IMAGES */}

      {value.length > 0 && (
        <div
          className="
            grid
            grid-cols-1
            gap-4

            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {value.map((url) => (
            <div
              key={url}
              className="
                relative

                h-48
                md:h-40

                overflow-hidden

                rounded-2xl

                border
                border-slate-200
              "
            >
              <Image
                src={url}
                alt="Listing image"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* UPLOAD BUTTON */}

      {!disabled && (
        <UploadButton
          endpoint="listingImageUploader"
          onBeforeUploadBegin={(
            files: File[]
          ) => {
            onUploadStart?.();

            return files;
          }}
          onClientUploadComplete={(
            res: UploadedFile[]
          ) => {
            const urls = res.map(
              (file) => file.url
            );

            const uniqueUrls =
              Array.from(
                new Set([
                  ...value,
                  ...urls,
                ])
              );

            onChange(
              uniqueUrls
            );

            onUploadComplete?.();
          }}
          onUploadError={(
            error: Error
          ) => {
            console.error(
              "Upload failed:",
              error
            );

            onUploadComplete?.();
          }}
        />
      )}
    </div>
  );
}
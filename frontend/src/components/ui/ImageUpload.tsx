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
  onUploadStart,
  onUploadComplete,
}: ImageUploadProps) {
  return (
    <div className="space-y-6">
      {/* Preview Images */}

      {value.length >
        0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {value.map(
            (
              url
            ) => (
              <div
                key={
                  url
                }
                className="
                  relative
                  h-40
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
                  className="object-cover"
                />
              </div>
            )
          )}
        </div>
      )}

      {/* Upload Button */}

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
          const urls =
            res.map(
              (
                file
              ) =>
                file.url
            );

          onChange([
            ...value,
            ...urls,
          ]);

          onUploadComplete?.();
        }}
        onUploadError={(
          error: Error
        ) => {
          console.error(
            error
          );

          alert(
            error.message
          );

          onUploadComplete?.();
        }}
      />
    </div>
  );
}
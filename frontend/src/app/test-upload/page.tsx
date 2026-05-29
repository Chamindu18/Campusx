"use client";

import {
  UploadButton,
} from "@/lib/uploadthing";

export default function TestUploadPage() {
  return (
    <div className="p-20">
      <h1 className="mb-10 text-4xl font-bold">
        Upload Test
      </h1>

      <UploadButton
        endpoint="listingImageUploader"
        onClientUploadComplete={(
          res
        ) => {
          console.log(
            "UPLOAD SUCCESS",
            res
          );

          alert(
            "Upload success"
          );
        }}
        onUploadError={(
          error
        ) => {
          console.error(
            error
          );

          alert(
            error.message
          );
        }}
      />
    </div>
  );
}
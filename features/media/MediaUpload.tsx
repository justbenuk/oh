"use client";

import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import type { UploadedMedia } from "./MediaSchema";

type Props = {
  endpoint: keyof OurFileRouter;
  value: UploadedMedia | null;
  onChangeAction: (media: UploadedMedia) => void;
  label?: string;
  replaceLabel?: string;
};

export default function MediaUpload({
  endpoint,
  value,
  onChangeAction,
  label = "Upload image",
  replaceLabel = "Replace image",
}: Props) {
  return (
    <UploadButton
      endpoint={endpoint}
      appearance={{
        container: "w-full",
        button:
          "h-10 w-full rounded-md border bg-primary px-6 text-primary-foreground",
        allowedContent: "text-xs text-muted-foreground",
      }}
      content={{
        button({ ready, isUploading }) {
          if (!ready) return "Preparing...";
          if (isUploading) return "Uploading...";
          return value ? replaceLabel : label;
        },
      }}
      onClientUploadComplete={async (result) => {
        const uploaded = result[0]?.serverData;

        if (!uploaded?.mediaId || !uploaded.url) {
          toast.error("Failed to upload image");
          return;
        }

        const media = { id: uploaded.mediaId, url: uploaded.url };

        onChangeAction(media);
      }}
      onUploadError={(error) => {
        toast.error(error.message || "Upload failed");
      }}
    />
  );
}

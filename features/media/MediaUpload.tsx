"use client";

import { useEffect, useRef } from "react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import { DeletePendingMediaAction } from "./MediaActions";
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
  const pendingMediaId = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (pendingMediaId.current) {
        void DeletePendingMediaAction(pendingMediaId.current);
      }
    };
  }, []);

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

        const previousPendingMediaId = pendingMediaId.current;
        const media = { id: uploaded.mediaId, url: uploaded.url };

        pendingMediaId.current = media.id;
        onChangeAction(media);

        if (previousPendingMediaId && previousPendingMediaId !== media.id) {
          try {
            await DeletePendingMediaAction(previousPendingMediaId);
          } catch {
            toast.error("The previous upload could not be removed");
          }
        }
      }}
      onUploadError={(error) => {
        toast.error(error.message || "Upload failed");
      }}
    />
  );
}

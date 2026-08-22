  "use client";

  import { UploadButton as UploadThingButton } from "@/lib/uploadthing";
  import type { OurFileRouter } from "@/app/api/uploadthing/core";
  import { toast } from "sonner";

  type Endpoint = keyof OurFileRouter;

  export type UploadedMedia = {
    id: string;
    url: string;
    name: string;
    type: string;
  };

  type Props = {
    endpoint: Endpoint;
    value?: string | string[] | null;
    multiple?: boolean;
    label?: string;
    replaceLabel?: string;
    onUploadComplete: (files: UploadedMedia[]) => void;
    onUploadError?: (error: Error) => void;
  };

  export default function UploadButton({
    endpoint,
    value,
    multiple = false,
    label = "Upload file",
    replaceLabel = "Replace file",
    onUploadComplete,
    onUploadError,
  }: Props) {
    const hasValue = Array.isArray(value) ? value.length > 0 : Boolean(value);

    return (
      <UploadThingButton
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
            if (!multiple && hasValue) return replaceLabel;
            return label;
          },
        }}
        onClientUploadComplete={(result) => {
          const files = result.flatMap((file) => {
            if (!file.serverData?.url || !file.serverData.mediaId) {
              return [];
            }

            return [{
              id: file.serverData.mediaId,
              url: file.serverData.url,
              name: file.name,
              type: file.type,
            }];
          });

          if (!files.length) {
            toast.error("No files were uploaded");
            return;
          }

          onUploadComplete(files);
        }}
        onUploadError={(error) => {
          toast.error(error.message || "Upload failed");
          onUploadError?.(error);
        }}
      />
    );
  }

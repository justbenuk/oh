import { z } from "zod";

export const UploadedMediaSchema = z.object({
  id: z.string().min(1),
  url: z.string().url(),
});

export type UploadedMedia = z.infer<typeof UploadedMediaSchema>;

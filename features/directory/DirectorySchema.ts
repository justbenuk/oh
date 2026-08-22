import z from "zod";
import { UploadedMediaSchema } from "@/features/media/MediaSchema";

export const LicenseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  websiteUrl: z.string().url('Invalid URL'),
  logo: UploadedMediaSchema,
  email: z.string().email('Invalid email'),
  contactNumber: z.string().min(1, 'Contact number is required'),
  longitude: z.number().optional(),
  latitude: z.number().optional(),
})

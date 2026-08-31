import z from "zod";
import { UploadedMediaSchema } from "@/features/media/MediaSchema";

export const LicensingFieldsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  websiteUrl: z.string().url("Invalid URL"),
  email: z.string().email("Invalid email"),
  contactNumber: z.string().min(1, "Contact number is required"),
  longitude: z.number().optional(),
  latitude: z.number().optional(),
});

export const EditLicenseSchema = LicensingFieldsSchema.extend({
  logo: UploadedMediaSchema.optional(),
});

export const AddLicenseSchema = EditLicenseSchema.refine(
  (data) => data.logo !== undefined,
  {
    path: ["logo"],
    message: "Logo is required",
  },
);

export type LicenseFormValues = z.infer<typeof EditLicenseSchema>;

export const DirectoryCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "A description is required"),
});

export const EditDirectoryCategorySchema = DirectoryCategorySchema.extend({
  image: UploadedMediaSchema.optional(),
});

export const AddDirectoryCategorySchema = EditDirectoryCategorySchema.refine(
  (data) => data.image !== undefined,
  {
    path: ["image"],
    message: "Image is required",
  },
);

export type DirectoryCategoryFormValues = z.infer<
  typeof EditDirectoryCategorySchema
>;

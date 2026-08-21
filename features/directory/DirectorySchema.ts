import z from "zod";

export const LicenseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  websiteUrl: z.string().url('Invalid URL'),
  logo: z.string().min(1, 'Logo is required'),
  email: z.string().email('Invalid email'),
  contactNumber: z.string().min(1, 'Contact number is required'),
  longitude: z.number().optional(),
  latitude: z.number().optional(),
})

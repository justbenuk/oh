import { z } from "zod";

export const SiteContactSchema = z.object({
  name: z.string().min(1, "What's your name"),
  email: z.email("What's your contact email"),
  subject: z.string().optional(),
  message: z.string().min(1, "How can I help?"),
});

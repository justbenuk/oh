"use server";

import z from "zod";
import { SiteContactSchema } from "./ContactSchemas";
import { db } from "@/lib/db";

export async function SiteContactAction(data: z.infer<typeof SiteContactSchema>) {
  try {
    const validated = SiteContactSchema.parse(data);

    await db.siteContact.create({
      data: validated,
    });

    return { success: true };
  } catch (error) {
    throw new Error(`Site Contact Error: ${error}`);
  }
}

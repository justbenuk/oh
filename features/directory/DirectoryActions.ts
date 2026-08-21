'use server'

import z from "zod";
import { LicenseSchema } from "./DirectorySchema";
import { isAdmin } from "../auth/AuthActions";
import { db } from "@/lib/db";

export async function AddLicensingAuthorityAction(data: z.infer<typeof LicenseSchema>) {
  try {
    await isAdmin()

    const validated = LicenseSchema.parse(data)

    await db.licensing.create({
      data: validated
    })

    return {success: true}
  } catch (error) {
    throw new Error(`Licensing Error: ${error}`)
  }
}

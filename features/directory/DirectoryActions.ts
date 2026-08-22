'use server'

import z from "zod";
import { LicenseSchema } from "./DirectorySchema";
import { isAdmin } from "../auth/AuthActions";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { findOwnedPendingMedia } from "@/features/media/media-service";

export async function AddLicensingAuthorityAction(data: z.infer<typeof LicenseSchema>) {
  try {
    await isAdmin()

    const validated = LicenseSchema.parse(data)

    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) throw new Error("Unauthorized")

    const media = await findOwnedPendingMedia(validated.logo.id, session.user.id)

    if (!media || media.url !== validated.logo.url) {
      throw new Error("Invalid logo upload")
    }

    const { logo, ...licensing } = validated

    await db.licensing.create({
      data: {
        ...licensing,
        logo: logo.url,
        media: {
          connect: { id: logo.id },
        },
      },
    })

    return {success: true}
  } catch (error) {
    throw new Error(`Licensing Error: ${error}`)
  }
}

export async function FetchAllLicensingAuthorities(take?: number){
  try {
    const data = await db.licensing.findMany({
      take,
      orderBy: {
        name: 'asc'
      }
    })

    return {success: true, data}
  } catch (error) {
    throw new Error(`Licensing Error@ ${error}`)
  }
}

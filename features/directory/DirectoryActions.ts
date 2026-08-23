"use server";

import {
  AddLicenseSchema,
  EditLicenseSchema,
  type LicenseFormValues,
} from "./DirectorySchema";
import { isAdmin } from "../auth/AuthActions";
import { db } from "@/lib/db";
import { findOwnedPendingMedia } from "@/features/media/media-service";
import type { UploadedMedia } from "@/features/media/MediaSchema";
import slugify from "slugify";
import { revalidatePath } from "next/cache";

const licensingPath = "/portal/licensing";

async function verifyPendingLogo(logo: UploadedMedia, userId: string) {
  const media = await findOwnedPendingMedia(logo.id, userId);

  if (!media || media.url !== logo.url) {
    throw new Error("Invalid logo upload");
  }

  return media;
}

function createLicensingSlug(name: string) {
  return slugify(name, { lower: true });
}


export async function FetchSingleLicensingAction({slug}: {slug: string}){
  return db.licensing.findFirst({
    where: {slug}
  })
}

export async function FetchSingleLicensingActionById({id}: {id: string}){
  await isAdmin()
  return db.licensing.findUnique({
    where: {id}
  })
}

export async function AddLicensingAuthorityAction(data: LicenseFormValues) {
  try {
    const user = await isAdmin();
    const validated = AddLicenseSchema.parse(data);
    const { logo, ...licensing } = validated;

    if (!logo) {
      throw new Error("Logo is required");
    }

    await verifyPendingLogo(logo, user.id);

    await db.licensing.create({
      data: {
        ...licensing,
        slug: createLicensingSlug(licensing.name),
        logo: logo.url,
        media: {
          connect: { id: logo.id },
        },
      },
    });

    revalidatePath(licensingPath);
    return { success: true };
  } catch (error) {
    throw new Error(`Licensing Error: ${error}`);
  }
}

export async function UpdateLicensingAuthorityAction(
  authorityId: string,
  data: LicenseFormValues,
) {
  try {
    const user = await isAdmin();
    const validated = EditLicenseSchema.parse(data);
    const { logo, ...licensing } = validated;

    if (logo) {
      await verifyPendingLogo(logo, user.id);
    }

    await db.licensing.update({
      where: { id: authorityId },
      data: {
        ...licensing,
        slug: createLicensingSlug(licensing.name),
        ...(logo
          ? {
              logo: logo.url,
              media: {
                connect: { id: logo.id },
              },
            }
          : {}),
      },
    });

    revalidatePath(licensingPath);
    return { success: true };
  } catch (error) {
    throw new Error(`Licensing Error: ${error}`);
  }
}
export async function FetchAllLicensingAuthorities(take?: number) {
  try {
    const data = await db.licensing.findMany({
      take,
      orderBy: {
        name: "asc",
      },
    });

    return { success: true, data };
  } catch (error) {
    throw new Error(`Licensing Error@ ${error}`);
  }
}

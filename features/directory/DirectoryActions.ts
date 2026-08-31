"use server";

import {
  AddDirectoryCategorySchema,
  AddLicenseSchema,
  DirectoryCategoryFormValues,
  EditDirectoryCategorySchema,
  EditLicenseSchema,
  type LicenseFormValues,
} from "./DirectorySchema";
import { requireAdmin } from "@/lib/session";
import { db } from "@/lib/db";
import { findOwnedPendingMedia } from "@/features/media/media-service";
import type { UploadedMedia } from "@/features/media/MediaSchema";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { utapi } from "@/app/api/uploadthing/core";

const licensingPath = "/portal/licensing";
const categoryPath = "/portal/directory/categories";

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

export async function FetchAllDirectoryCategories(take?: number) {
  const data = await db.directoryCategory.findMany({
    take,
  });

  return { success: true, data };
}

export async function DeleteAuthorityById(id: string) {
  await requireAdmin();
  try {
    const authority = await db.licensing.findUnique({
      where: {
        id,
      },
      include: {
        media: true,
      },
    });

    if (!authority) throw new Error("Authority not found");

    const mediaKeys = authority.media.map((media) => media.key);

    await db.$transaction(async (tx) => {
      await tx.media.deleteMany({
        where: {
          licensingId: id,
        },
      });
      await tx.licensing.delete({
        where: { id },
      });
    });

    if (mediaKeys.length > 0) {
      await utapi.deleteFiles(mediaKeys);
    }

    revalidatePath(licensingPath);
    return { success: true };
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function FetchSingleLicensingAction({ slug }: { slug: string }) {
  return db.licensing.findFirst({
    where: { slug },
  });
}

export async function FetchSingleLicensingActionById({ id }: { id: string }) {
  await requireAdmin();
  return db.licensing.findUnique({
    where: { id },
  });
}

export async function AddLicensingAuthorityAction(data: LicenseFormValues) {
  const user = await requireAdmin();

  try {
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
  const user = await requireAdmin();

  try {
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

export async function UpdateDirectoryCategoryAction(
  categoryId: string,
  data: DirectoryCategoryFormValues,
) {
  await requireAdmin();

  try {
    const validated = EditDirectoryCategorySchema.parse(data);
    const { image, ...category } = validated;

    await db.directoryCategory.update({
      where: { id: categoryId },
      data: {
        ...category,
        slug: slugify(validated.name, { lower: true }),
        ...(image
          ? {
              image: image.url,
              media: { connect: { id: image.id } },
            }
          : {}),
      },
    });
    revalidatePath(categoryPath);
    return { success: true };
  } catch (error) {
    throw new Error(`Directory Category: ${error}`);
  }
}

export async function AddDirectoryCategoryAction(
  data: DirectoryCategoryFormValues,
) {
  await requireAdmin();
  try {
    const validated = AddDirectoryCategorySchema.parse(data);
    const { image, ...category } = validated;

    if (!image) {
      throw new Error("An image is required");
    }

    await db.directoryCategory.create({
      data: {
        ...category,
        slug: slugify(validated.name, { lower: true }),
        image: image.url,
        media: { connect: { id: image.id } },
      },
    });

    revalidatePath(categoryPath);
    return { success: true };
  } catch (error) {
    throw new Error(`Directory Category Error: ${error}`);
  }
}

export async function FetchDirectoryCategoryById({ id }: { id: string }) {
  await requireAdmin();
  return db.directoryCategory.findFirst({ where: { id } });
}

export async function DeleteDirectoryCategoreyById(id: string) {
  await requireAdmin();
  try {
    const category = await db.directoryCategory.findFirst({
      where: { id },
      include: {
        media: true,
      },
    });

    if (!category) throw new Error("Category not found");

    await db.$transaction(async (tx) => {
      await tx.directoryCategory.delete({
        where: { id },
      });
      await tx.media.delete({
        where: {
          id: category.media.id,
        },
      });
    });

    await utapi.deleteFiles(category.media.key);

    revalidatePath(categoryPath);
    return { success: true };
  } catch (error) {
    throw new Error(`${error}`);
  }
}

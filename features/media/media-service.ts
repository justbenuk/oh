import "server-only";

import { utapi } from "@/app/api/uploadthing/core";
import { db } from "@/lib/db";

export async function findOwnedPendingMedia(mediaId: string, userId: string) {
  return db.media.findFirst({
    where: {
      id: mediaId,
      uploadedById: userId,
      licensingId: null,
    },
  });
}

export async function deleteStoredMedia(media: { id: string; key: string }) {
  await utapi.deleteFiles(media.key);
  await db.media.delete({ where: { id: media.id } });
}

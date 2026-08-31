import "server-only";

import { db } from "@/lib/db";

export async function findOwnedPendingMedia(mediaId: string, userId: string) {
  return db.media.findFirst({
    where: {
      id: mediaId,
      uploadedById: userId,
      licensingId: null,
      directoryCategories: {
        none: {},
      },
    },
  });
}

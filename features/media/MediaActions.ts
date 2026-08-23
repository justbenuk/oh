"use server";

import { requireUser } from "@/lib/session";
import { deleteStoredMedia, findOwnedPendingMedia } from "./media-service";

export async function DeletePendingMediaAction(mediaId: string) {
  const user = await requireUser();

  const media = await findOwnedPendingMedia(mediaId, user.id);

  // Attached media and media owned by another user must not be removed here.
  if (!media) return { success: false };

  await deleteStoredMedia(media);
  return { success: true };
}

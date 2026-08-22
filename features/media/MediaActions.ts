"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { deleteStoredMedia, findOwnedPendingMedia } from "./media-service";

export async function DeletePendingMediaAction(mediaId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  const media = await findOwnedPendingMedia(mediaId, session.user.id);

  // Attached media and media owned by another user must not be removed here.
  if (!media) return { success: false };

  await deleteStoredMedia(media);
  return { success: true };
}

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";

const f = createUploadthing();
export const utapi = new UTApi();

export const ourFileRouter = {
  logoUploader: f({
    image: {
      maxFileSize: "32MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await auth.api.getSession({
        headers: await headers(),
        query: { disableCookieCache: true },
      });
      if (!session || session.user.role !== "admin") {
        throw new UploadThingError("Unauthorized");
      }
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      //after the file is uploaded, we save the details inthe database. This will help us to be able to reuse images if we want to.. but also delete files easier
      const logo = await db.media.create({
        data: {
          key: file.key,
          url: file.ufsUrl,
          name: file.name,
          size: file.size,
          mimeType: file.type,
          type: "IMAGE",
          uploadedById: metadata.userId,
        },
      });

      //return the url
      return {
        mediaId: logo.id,
        url: file.ufsUrl,
      };
    }),
  directoryCategoryImageUploader: f({
    image: {
      maxFileSize: "32MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await auth.api.getSession({
        headers: await headers(),
        query: { disableCookieCache: true },
      });
      if (!session || session.user.role !== "admin") {
        throw new UploadThingError("Unauthorized");
      }
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      //after the file is uploaded, we save the details inthe database. This will help us to be able to reuse images if we want to.. but also delete files easier
      const logo = await db.media.create({
        data: {
          key: file.key,
          url: file.ufsUrl,
          name: file.name,
          size: file.size,
          mimeType: file.type,
          type: "IMAGE",
          uploadedById: metadata.userId,
        },
      });

      //return the url
      return {
        mediaId: logo.id,
        url: file.ufsUrl,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

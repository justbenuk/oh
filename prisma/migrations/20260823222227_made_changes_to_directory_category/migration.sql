/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `directory-category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mediaId` to the `directory-category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `directory-category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "directory-category" ADD COLUMN     "mediaId" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "directory-category_slug_key" ON "directory-category"("slug");

-- AddForeignKey
ALTER TABLE "directory-category" ADD CONSTRAINT "directory-category_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

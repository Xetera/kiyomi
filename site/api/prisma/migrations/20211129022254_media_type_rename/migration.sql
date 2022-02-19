/*
  Warnings:

  - You are about to drop the column `mediaType` on the `discovered_images` table. All the data in the column will be lost.
  - You are about to drop the column `referenceUrl` on the `discovered_images` table. All the data in the column will be lost.
  - Added the required column `media_type` to the `discovered_images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "discovered_images"
    RENAME COLUMN "mediaType" TO "media_type";
ALTER TABLE "discovered_images" RENAME COLUMN "referenceUrl" TO "reference_url";

-- RenameIndex
ALTER INDEX "discovered_image_votes.user_id_discovered_image_id_unique" RENAME TO "userVote";

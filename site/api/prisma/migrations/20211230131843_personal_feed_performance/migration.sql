/*
  Warnings:

  - You are about to drop the column `category` on the `tags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_category_fkey";

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "category",
ADD COLUMN     "category_id" INTEGER;

-- CreateIndex
CREATE INDEX "discoveredImageVotesImage" ON "discovered_image_votes"("discovered_image_id");

-- CreateIndex
CREATE INDEX "providerImagePost" ON "discovered_images"("post_id");

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "tag_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

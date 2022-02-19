/*
  Warnings:

  - A unique constraint covering the columns `[image_id]` on the table `discovered_images` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "discovered_images" ADD COLUMN     "duplicate_image_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "discovered_images.image_id_unique" ON "discovered_images"("image_id");

-- AddForeignKey
ALTER TABLE "discovered_images" ADD FOREIGN KEY ("duplicate_image_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

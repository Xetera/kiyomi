/*
  Warnings:

  - You are about to drop the column `imageId` on the `appearances` table. All the data in the column will be lost.
  - You are about to drop the column `descriptor` on the `faces` table. All the data in the column will be lost.
  - Added the required column `image_id` to the `appearances` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appearances" DROP CONSTRAINT "appearances_imageId_fkey";

-- AlterTable
ALTER TABLE "appearances" DROP COLUMN "imageId",
ADD COLUMN  "image_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "appearances" ADD FOREIGN KEY("image_id")REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appearances" ADD FOREIGN KEY("image_id")REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

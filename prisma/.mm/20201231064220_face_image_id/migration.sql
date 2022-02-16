/*
  Warnings:

  - Added the required column `image_id` to the `faces` table without a default value. This is not possible if the table is not empty.

*/

-- AlterTable
ALTER TABLE "faces"
ADD COLUMN "image_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "faces" ADD FOREIGN KEY("image_id") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `mime_type` on the `images` table. All the data in the column will be lost.
  - Added the required column `mimetype` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable

ALTER TABLE "images" RENAME COLUMN "mime_type" to "mimetype";

-- AddForeignKey
ALTER TABLE "sessions" ADD FOREIGN KEY("user_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

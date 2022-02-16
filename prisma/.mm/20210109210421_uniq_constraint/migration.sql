/*
  Warnings:

  - You are about to drop the column `personId` on the `faces` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[person_id,image_id]` on the table `appearances`. If there are existing duplicate values, the migration will fail.

*/

-- DropForeignKey
ALTER TABLE "faces" DROP CONSTRAINT "faces_personId_fkey";

-- AlterTable
ALTER TABLE "faces" RENAME "personId" to "person_id";

-- CreateIndex
CREATE UNIQUE INDEX "unique_image_person" ON "appearances"("person_id", "image_id");

-- AddForeignKey
ALTER TABLE "faces" ADD FOREIGN KEY("person_id")REFERENCES "persons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

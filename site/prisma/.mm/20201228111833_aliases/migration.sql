/*
  Warnings:

  - You are about to drop the column `personId` on the `aliases` table. All the data in the column will be lost.
  - Added the required column `person_id` to the `aliases` table without a default value. This is not possible if the table is not empty.

*/

-- DropForeignKey
ALTER TABLE "aliases" DROP CONSTRAINT "aliases_personId_fkey";

-- AlterTable
ALTER TABLE "aliases" DROP COLUMN "personId",
ADD COLUMN     "person_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "persons" ADD COLUMN     "description" TEXT;

-- AddForeignKey
ALTER TABLE "aliases" ADD FOREIGN KEY("person_id")REFERENCES "persons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

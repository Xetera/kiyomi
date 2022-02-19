/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[ireneBotId]` on the table `images`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[irene_bot_id]` on the table `persons`. If there are existing duplicate values, the migration will fail.

*/
-- DropIndex
DROP INDEX "faces_descriptor";

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "ireneBotId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "images.ireneBotId_unique" ON "images"("ireneBotId");

-- CreateIndex
CREATE UNIQUE INDEX "persons.irene_bot_id_unique" ON "persons"("irene_bot_id");

/*
  Warnings:

  - You are about to drop the column `ireneBotId` on the `images` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[irene_bot_id]` on the table `images` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
-- DROP INDEX "images.ireneBotId_unique";

-- AlterTable
ALTER TABLE "images"
  RENAME "ireneBotId" TO "irene_bot_id";

-- CreateIndex
-- CREATE UNIQUE INDEX "images.irene_bot_id_unique" ON "images"("irene_bot_id");

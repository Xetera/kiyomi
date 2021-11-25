/*
  Warnings:

  - A unique constraint covering the columns `[ireneBotId]` on the table `groups` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "groups.ireneBotId_unique" ON "groups"("ireneBotId");

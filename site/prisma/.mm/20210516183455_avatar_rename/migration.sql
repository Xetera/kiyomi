/*
  Warnings:

  - You are about to drop the column `thumbnailId` on the `groups` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[avatarId]` on the table `groups` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `avatarId` to the `groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_thumbnailId_fkey";

-- DropIndex
DROP INDEX "groups_thumbnailId_unique";

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "thumbnailId",
ADD COLUMN     "avatarId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "groups_avatarId_unique" ON "groups"("avatarId");

-- AddForeignKey
ALTER TABLE "groups" ADD FOREIGN KEY ("avatarId") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `groupId` on the `group_aliases` table. All the data in the column will be lost.
  - You are about to drop the column `bannerId` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `avatarId` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `ireneBotId` on the `groups` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[irene_bot_id]` on the table `groups` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[banner_id]` on the table `groups` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[avatar_id]` on the table `groups` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `group_id` to the `group_aliases` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "group_aliases" DROP CONSTRAINT "group_aliases_groupId_fkey";

-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_avatarId_fkey";

-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_bannerId_fkey";

-- DropIndex
DROP INDEX "groups.ireneBotId_unique";

-- DropIndex
DROP INDEX "groups_avatarId_unique";

-- DropIndex
DROP INDEX "groups_bannerId_unique";

-- AlterTable
ALTER TABLE "group_aliases" DROP COLUMN "groupId",
ADD COLUMN     "group_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "bannerId",
DROP COLUMN "avatarId",
DROP COLUMN "ireneBotId",
ADD COLUMN     "banner_id" INTEGER,
ADD COLUMN     "avatar_id" INTEGER,
ADD COLUMN     "irene_bot_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "groups.irene_bot_id_unique" ON "groups"("irene_bot_id");

-- CreateIndex
CREATE UNIQUE INDEX "groups_banner_id_unique" ON "groups"("banner_id");

-- CreateIndex
CREATE UNIQUE INDEX "groups_avatar_id_unique" ON "groups"("avatar_id");

-- AddForeignKey
ALTER TABLE "group_aliases" ADD FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD FOREIGN KEY ("banner_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD FOREIGN KEY ("avatar_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

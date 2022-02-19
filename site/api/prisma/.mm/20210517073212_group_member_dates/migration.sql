/*
  Warnings:

  - You are about to drop the column `joinDate` on the `group_members` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "group_members" DROP COLUMN "joinDate",
ADD COLUMN     "startDate" TIMESTAMP(3);

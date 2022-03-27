/*
  Warnings:

  - You are about to drop the column `hiddenAt` on the `images` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "images" DROP COLUMN "hiddenAt",
ADD COLUMN     "hidden_at" TIMESTAMP(3);

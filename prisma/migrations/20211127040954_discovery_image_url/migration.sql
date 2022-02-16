/*
  Warnings:

  - Added the required column `url` to the `discovered_images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "discovered_images" ADD COLUMN     "url" TEXT NOT NULL;

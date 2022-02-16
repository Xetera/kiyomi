/*
  Warnings:

  - Made the column `width` on table `images` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `height` on table `images` required. The migration will fail if there are existing NULL values in that column.

*/

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "face_scan_date" TIMESTAMP(3),
ALTER COLUMN "width" SET NOT NULL,
ALTER COLUMN "height" SET NOT NULL;

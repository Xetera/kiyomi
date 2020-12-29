/*
  Warnings:

  - You are about to drop the `Face` table. If the table is not empty, all the data it contains will be lost.

*/
CREATE EXTENSION IF NOT EXISTS cube;
-- DropForeignKey
ALTER TABLE "Face" DROP CONSTRAINT "Face_imageId_fkey";

-- CreateTable
CREATE TABLE "faces" (
"id" SERIAL,
    "imageId" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "descriptor" CUBE,

    PRIMARY KEY ("id")
);

-- DropTable
DROP TABLE "Face";

-- AddForeignKey
ALTER TABLE "faces" ADD FOREIGN KEY("imageId")REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

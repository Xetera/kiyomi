/*
  Warnings:

  - You are about to drop the column `person_id` on the `faces` table. All the data in the column will be lost.
  - You are about to drop the column `image_id` on the `faces` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "face.image_id.index";

-- DropForeignKey
ALTER TABLE "faces" DROP CONSTRAINT "faces_image_id_fkey";

-- DropForeignKey
ALTER TABLE "faces" DROP CONSTRAINT "faces_person_id_fkey";

-- AlterTable
ALTER TABLE "faces"
DROP COLUMN "person_id",
DROP COLUMN "image_id",
ADD COLUMN     "appearance_id" INTEGER,
ADD COLUMN     "added_by_id" INTEGER,
ADD COLUMN     "personId" INTEGER;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bot" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "appearances" (
"id" SERIAL,
    "person_id" INTEGER NOT NULL,
    "added_by_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "face.appearanceId.index" ON "faces"("appearance_id");

-- AddForeignKey
ALTER TABLE "appearances" ADD FOREIGN KEY("person_id")REFERENCES "persons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appearances" ADD FOREIGN KEY("added_by_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appearances" ADD FOREIGN KEY("imageId")REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faces" ADD FOREIGN KEY("added_by_id")REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faces" ADD FOREIGN KEY("appearance_id")REFERENCES "appearances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faces" ADD FOREIGN KEY("personId")REFERENCES "persons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faces" ADD FOREIGN KEY("appearance_id")REFERENCES "appearances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

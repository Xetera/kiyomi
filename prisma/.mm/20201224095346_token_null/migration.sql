/*
  Warnings:

  - You are about to drop the column `imageId` on the `faces` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[token]` on the table `users`. If there are existing duplicate values, the migration will fail.
  - Added the required column `image_id` to the `faces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "faces" DROP CONSTRAINT "faces_imageId_fkey";

-- AlterTable
ALTER TABLE "faces" DROP COLUMN "imageId",
ADD COLUMN     "person_id" INTEGER,
ADD COLUMN     "image_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "p_hash" TEXT;

-- CreateTable
CREATE TABLE "aliases" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persons" (
"id" SERIAL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "person.name.index" ON "persons"("name");

-- CreateIndex
CREATE INDEX "face.image_id.index" ON "faces"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "users.token_unique" ON "users"("token");

-- AddForeignKey
ALTER TABLE "aliases" ADD FOREIGN KEY("personId")REFERENCES "persons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faces" ADD FOREIGN KEY("image_id")REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faces" ADD FOREIGN KEY("person_id")REFERENCES "persons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

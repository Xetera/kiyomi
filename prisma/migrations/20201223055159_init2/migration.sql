/*
  Warnings:

  - The migration will change the primary key for the `images` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will add a unique constraint covering the columns `[slug]` on the table `images`. If there are existing duplicate values, the migration will fail.

*/
-- CreateEnum
CREATE TYPE "TagSource" AS ENUM ('USER');

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- AlterTable
ALTER TABLE "images" DROP CONSTRAINT "images_pkey",
ADD COLUMN "id" SERIAL,
ADD PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "tags" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "source" "TagSource" NOT NULL,
    "image_id" INTEGER NOT NULL,
    "added_by_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "image.index" ON "tags"("image_id");

-- CreateIndex
CREATE INDEX "user.index" ON "tags"("added_by_id");

-- CreateIndex
CREATE UNIQUE INDEX "images.slug_unique" ON "images"("slug");

-- AddForeignKey
ALTER TABLE "tags" ADD FOREIGN KEY("image_id")REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD FOREIGN KEY("added_by_id")REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

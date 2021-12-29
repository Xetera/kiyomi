/*
  Warnings:

  - You are about to drop the column `image_id` on the `tags` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `tags` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_image_id_fkey";

-- DropIndex
DROP INDEX "image.index";

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "image_id",
ADD COLUMN     "tag_category" INTEGER,
ALTER COLUMN "source" SET DEFAULT E'USER';

-- CreateTable
CREATE TABLE "tag_alias" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "added_by_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tag_alias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "added_by_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tag_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appearance_tags" (
    "id" SERIAL NOT NULL,
    "apperance_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "added_by_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageId" INTEGER,

    CONSTRAINT "appearance_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image_tags" (
    "id" SERIAL NOT NULL,
    "image_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "added_by_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "image_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "alias_tag" ON "tag_alias"("tag_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "tag_categories_name_key" ON "tag_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "appearance_tag" ON "appearance_tags"("tag_id", "apperance_id");

-- CreateIndex
CREATE UNIQUE INDEX "image_tag" ON "image_tags"("tag_id", "image_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_tag_category_fkey" FOREIGN KEY ("tag_category") REFERENCES "tag_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_alias" ADD CONSTRAINT "tagAlias" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_alias" ADD CONSTRAINT "tag_alias_added_by_id_fkey" FOREIGN KEY ("added_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_categories" ADD CONSTRAINT "tag_categories_added_by_id_fkey" FOREIGN KEY ("added_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appearance_tags" ADD CONSTRAINT "appearance_tags_apperance_id_fkey" FOREIGN KEY ("apperance_id") REFERENCES "appearances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appearance_tags" ADD CONSTRAINT "appearance_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appearance_tags" ADD CONSTRAINT "appearance_tags_added_by_id_fkey" FOREIGN KEY ("added_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appearance_tags" ADD CONSTRAINT "appearance_tags_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_tags" ADD CONSTRAINT "image_tags_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_tags" ADD CONSTRAINT "image_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_tags" ADD CONSTRAINT "image_tags_added_by_id_fkey" FOREIGN KEY ("added_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "personAlias" RENAME TO "person_alias";

-- RenameIndex
ALTER INDEX "user.index" RENAME TO "tag_added_by";

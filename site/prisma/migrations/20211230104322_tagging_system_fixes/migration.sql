/*
  Warnings:

  - You are about to drop the column `tag_category` on the `tags` table. All the data in the column will be lost.
  - You are about to drop the `tag_alias` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tag_alias" DROP CONSTRAINT "tag_alias_added_by_id_fkey";

-- DropForeignKey
ALTER TABLE "tag_alias" DROP CONSTRAINT "tagAlias";

-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_tag_category_fkey";

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "tag_category",
ADD COLUMN     "category" INTEGER;

-- DropTable
DROP TABLE "tag_alias";

-- CreateTable
CREATE TABLE "tag_aliases" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "added_by_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tag_aliases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "alias_tag" ON "tag_aliases"("tag_id", "name");

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_category_fkey" FOREIGN KEY ("category") REFERENCES "tag_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_aliases" ADD CONSTRAINT "tagAlias" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_aliases" ADD CONSTRAINT "tag_aliases_added_by_id_fkey" FOREIGN KEY ("added_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

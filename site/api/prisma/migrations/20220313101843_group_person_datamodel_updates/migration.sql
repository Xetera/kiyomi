/*
  Warnings:

  - You are about to drop the column `associatedEntityId` on the `user_restrictions` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "GroupGender" AS ENUM ('MALE', 'FEMALE', 'COED');

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "added_by_id" INTEGER,
ADD COLUMN     "company_id" INTEGER,
ADD COLUMN     "creation_date" TIMESTAMP(3),
ADD COLUMN     "discord" TEXT,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "fan_cafe" TEXT,
ADD COLUMN     "fan_name" TEXT,
ADD COLUMN     "gender" "GroupGender",
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "melon" TEXT,
ADD COLUMN     "spotify" TEXT,
ADD COLUMN     "tiktok" TEXT,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "vlive" TEXT,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "youtube" TEXT;

-- AlterTable
ALTER TABLE "image_reports" RENAME COLUMN "actionedAt" to "actioned_at";

-- AlterTable
ALTER TABLE "persons" ADD COLUMN     "added_by_id" INTEGER,
ADD COLUMN     "discord" TEXT,
ADD COLUMN     "eye_color" TEXT,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "fan_cafe" TEXT,
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "melon" TEXT,
ADD COLUMN     "native_name" TEXT,
ADD COLUMN     "spotify" TEXT,
ADD COLUMN     "tiktok" TEXT,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "vlive" TEXT,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "youtube" TEXT;

-- AlterTable
ALTER TABLE "user_restrictions" RENAME COLUMN "associatedEntityId" TO "associated_entity_id";

-- CreateTable
CREATE TABLE "person_nationalities" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "person_id" INTEGER NOT NULL,
    "added_by_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "person_nationalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "creation_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "person_nationalities_person_id_idx" ON "person_nationalities"("person_id");

-- RenameForeignKey
ALTER TABLE "tag_aliases" RENAME CONSTRAINT "tagAlias" TO "tag_aliases_tag_id_fkey";

-- AddForeignKey
ALTER TABLE "person_nationalities" ADD CONSTRAINT "person_nationalities_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_nationalities" ADD CONSTRAINT "person_nationalities_added_by_id_fkey" FOREIGN KEY ("added_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_added_by_id_fkey" FOREIGN KEY ("added_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_added_by_id_fkey" FOREIGN KEY ("added_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_company_id" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

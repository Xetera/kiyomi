/*
  Warnings:

  - A unique constraint covering the columns `[provider_type,unique_identifier]` on the table `discovered_images` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'NONBINARY');

-- AlterTable
ALTER TABLE "discovered_images" ADD COLUMN     "duplicate_discovered_image_id" INTEGER,
ADD COLUMN     "p_hash" cube;

-- AlterTable
ALTER TABLE "persons" ADD COLUMN     "gender" "Gender";

-- CreateIndex
CREATE UNIQUE INDEX "providerIdentity" ON "discovered_images"("provider_type", "unique_identifier");

-- AddForeignKey
ALTER TABLE "discovered_images" ADD FOREIGN KEY ("duplicate_discovered_image_id") REFERENCES "discovered_images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

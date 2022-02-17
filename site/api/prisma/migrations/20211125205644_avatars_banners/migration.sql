/*
  Warnings:

  - A unique constraint covering the columns `[banner_id]` on the table `persons` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[avatar_id]` on the table `persons` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[avatar_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bannerId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "persons" ADD COLUMN     "avatar_id" INTEGER;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar_id" INTEGER,
ADD COLUMN     "bannerId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "persons_banner_id_unique" ON "persons"("banner_id");

-- CreateIndex
CREATE UNIQUE INDEX "persons_avatar_id_unique" ON "persons"("avatar_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_avatar_id_unique" ON "users"("avatar_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_bannerId_unique" ON "users"("bannerId");

-- AddForeignKey
ALTER TABLE "persons" ADD FOREIGN KEY ("avatar_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY ("avatar_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY ("bannerId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

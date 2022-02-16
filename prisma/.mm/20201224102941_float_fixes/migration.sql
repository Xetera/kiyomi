/*
  Warnings:

  - You are about to alter the column `x` on the `faces` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `y` on the `faces` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `height` on the `faces` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `width` on the `faces` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- AlterTable
ALTER TABLE "faces" ALTER COLUMN "x" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "y" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "height" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "width" SET DATA TYPE DECIMAL(65,30);

-- CreateIndex
CREATE INDEX "user.token.index" ON "users"("token");

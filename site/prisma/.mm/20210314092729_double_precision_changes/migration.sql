/*
  Warnings:

  - You are about to alter the column `x` on the `faces` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `y` on the `faces` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `height` on the `faces` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `width` on the `faces` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `score` on the `faces` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - Made the column `descriptor` on table `faces` required. The migration will fail if there are existing NULL values in that column.

*/

-- AlterTable
ALTER TABLE "faces" ALTER COLUMN "x" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "y" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "height" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "width" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "descriptor" SET NOT NULL,
ALTER COLUMN "score" SET DATA TYPE DOUBLE PRECISION;

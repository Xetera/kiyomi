/*
  Warnings:

  - The `action` column on the `image_reports` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ImageReportAction" AS ENUM ('DISMISS', 'DELETE_IMAGE', 'HIDE_IMAGE', 'RESTRICT_USER', 'OTHER');

-- AlterTable
ALTER TABLE "image_reports" DROP COLUMN "action",
ADD COLUMN     "action" "ImageReportAction";

-- DropEnum
DROP TYPE "ReportAction";

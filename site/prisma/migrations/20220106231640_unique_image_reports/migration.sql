/*
  Warnings:

  - A unique constraint covering the columns `[image_id,reported_by_id]` on the table `image_reports` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "imageReportUser";

-- CreateIndex
CREATE UNIQUE INDEX "image_reports_image_id_reported_by_id_key" ON "image_reports"("image_id", "reported_by_id");

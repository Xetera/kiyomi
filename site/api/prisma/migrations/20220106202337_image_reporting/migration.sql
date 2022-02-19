-- CreateEnum
CREATE TYPE "RestrictionKind" AS ENUM ('NO_IMAGE_REPORT');

-- CreateEnum
CREATE TYPE "ReportAction" AS ENUM ('COMPLY', 'DISMISS', 'CUSTOM');

-- CreateTable
CREATE TABLE "user_restrictions" (
    "id" SERIAL NOT NULL,
    "restriction" "RestrictionKind" NOT NULL,
    "user_id" INTEGER NOT NULL,
    "added_by_id" INTEGER,
    "associatedEntityId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_restrictions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image_reports" (
    "id" SERIAL NOT NULL,
    "image_id" INTEGER NOT NULL,
    "reported_by_id" INTEGER NOT NULL,
    "action" "ReportAction",
    "actionedAt" TIMESTAMP(3),
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "image_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_restrictions_user_id_idx" ON "user_restrictions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_restrictions_user_id_restriction_key" ON "user_restrictions"("user_id", "restriction");

-- CreateIndex
CREATE INDEX "imageReportUser" ON "image_reports"("image_id", "reported_by_id");

-- AddForeignKey
ALTER TABLE "user_restrictions" ADD CONSTRAINT "user_restrictions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_restrictions" ADD CONSTRAINT "user_restrictions_added_by_id_fkey" FOREIGN KEY ("added_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_reports" ADD CONSTRAINT "image_reports_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_reports" ADD CONSTRAINT "image_reports_reported_by_id_fkey" FOREIGN KEY ("reported_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "image_reports" ADD COLUMN     "actioned_by_id" INTEGER;

-- AddForeignKey
ALTER TABLE "image_reports" ADD CONSTRAINT "image_reports_actioned_by_id_fkey" FOREIGN KEY ("actioned_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

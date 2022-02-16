-- AlterTable
ALTER TABLE "persons" ADD COLUMN     "banner_id" INTEGER;

-- AddForeignKey
ALTER TABLE "persons" ADD FOREIGN KEY ("banner_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE SET NULL;

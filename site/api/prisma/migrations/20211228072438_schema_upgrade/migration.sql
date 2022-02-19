-- DropForeignKey
ALTER TABLE "appearances" DROP CONSTRAINT "appearances_added_by_id_fkey";

-- AlterTable
ALTER TABLE "appearances" ALTER COLUMN "added_by_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "appearances" ADD CONSTRAINT "appearances_added_by_id_fkey" FOREIGN KEY ("added_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "discovered_images" ADD COLUMN     "referenceUrl" TEXT;

-- RenameIndex
ALTER INDEX "discovered_posts.provider_id" RENAME TO "discoveredProvider";

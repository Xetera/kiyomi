-- AlterTable
ALTER TABLE "faces" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "caption" TEXT,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "is_nsfw" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "source" TEXT;

-- AlterTable
ALTER TABLE "persons" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

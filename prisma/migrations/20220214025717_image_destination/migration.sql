-- CreateEnum
CREATE TYPE "UploadDestination" AS ENUM ('Local', 'S3');

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "destination" "UploadDestination" NOT NULL DEFAULT E'S3';

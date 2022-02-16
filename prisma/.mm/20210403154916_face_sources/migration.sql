-- CreateEnum
CREATE TYPE "FaceSource" AS ENUM ('Scan', 'Manual');

-- AlterTable
ALTER TABLE "faces" ADD COLUMN     "source" "FaceSource" NOT NULL DEFAULT E'Manual';

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterIndex
ALTER INDEX "unique_image_person" RENAME TO "appearance";

-- AlterIndex
ALTER INDEX "roles.role_name_user_id_unique" RENAME TO "userRole";

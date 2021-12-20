-- AlterTable
ALTER TABLE "discovered_image_votes" ADD COLUMN     "xp" INTEGER NOT NULL DEFAULT 5;

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "xp" INTEGER NOT NULL DEFAULT 15;

-- RenameIndex
ALTER INDEX "groups.avatar_id_unique" RENAME TO "groups_avatar_id_unique";

-- RenameIndex
ALTER INDEX "groups.banner_id_unique" RENAME TO "groups_banner_id_unique";

-- RenameIndex
ALTER INDEX "persons_avatar_id_unique" RENAME TO "persons.avatar_id_unique";

-- RenameIndex
ALTER INDEX "persons_banner_id_unique" RENAME TO "persons.banner_id_unique";

-- RenameIndex
ALTER INDEX "users_avatar_id_unique" RENAME TO "users.avatar_id_unique";

-- RenameIndex
ALTER INDEX "users_bannerId_unique" RENAME TO "users.bannerId_unique";

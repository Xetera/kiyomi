-- AlterTable
ALTER TABLE "group_aliases"
    RENAME "groupId" TO "group_id";

-- AlterTable
ALTER TABLE "groups"
    RENAME "bannerId" to "banner_id";
ALTER TABLE "groups"
    RENAME "avatarId" to "avatar_id";
ALTER TABLE "groups"
    RENAME "ireneBotId" to "irene_bot_id";

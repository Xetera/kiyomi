-- DropForeignKey
-- ALTER TABLE "group_members" DROP CONSTRAINT "group_members_groupId_fkey";

-- DropForeignKey
-- ALTER TABLE "group_members" DROP CONSTRAINT "group_members_personId_fkey";

-- DropIndex
-- DROP INDEX "member";

-- AlterTable
ALTER TABLE "group_members"
  RENAME "endDate" TO "end_date";

ALTER TABLE "group_members"
  RENAME "groupId" TO "group_id";

ALTER TABLE "group_members"
  RENAME "personId" TO "person_id";

ALTER TABLE "group_members"
  RENAME "startDate" TO "start_date";

-- CreateIndex
-- CREATE UNIQUE INDEX "member" ON "group_members"("group_id", "person_id");

-- AddForeignKey
-- ALTER TABLE "group_members" ADD FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
-- ALTER TABLE "group_members" ADD FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

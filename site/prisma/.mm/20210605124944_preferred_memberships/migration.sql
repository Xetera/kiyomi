-- AlterTable
ALTER TABLE "persons" ADD COLUMN     "preferred_membership_id" INTEGER;

-- AddForeignKey
ALTER TABLE "persons" ADD FOREIGN KEY ("preferred_membership_id") REFERENCES "group_members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

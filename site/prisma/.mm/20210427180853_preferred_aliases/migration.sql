/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[preferred_alias_id]` on the table `persons`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "persons" ADD COLUMN     "preferred_alias_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "persons_preferred_alias_id_unique" ON "persons"("preferred_alias_id");

-- AddForeignKey
ALTER TABLE "persons" ADD FOREIGN KEY ("preferred_alias_id") REFERENCES "aliases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[person_id,name]` on the table `aliases`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "personAlias" ON "aliases"("person_id", "name");

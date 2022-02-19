/*
  Warnings:

  - A unique constraint covering the columns `[discovered_image_id]` on the table `discovered_image_verdicts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,discovered_image_id]` on the table `discovered_image_votes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "discovered_image_verdicts.discovered_image_id_unique" ON "discovered_image_verdicts"("discovered_image_id");

-- CreateIndex
CREATE UNIQUE INDEX "discovered_image_votes.user_id_discovered_image_id_unique" ON "discovered_image_votes"("user_id", "discovered_image_id");

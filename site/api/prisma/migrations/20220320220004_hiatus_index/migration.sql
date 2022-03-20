-- CreateTable
CREATE TABLE "hiatuses" (
    "id" SERIAL NOT NULL,
    "group_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hiatuses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "hiatuses_group_id_idx" ON "hiatuses"("group_id");

-- AddForeignKey
ALTER TABLE "hiatuses" ADD CONSTRAINT "hiatuses_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

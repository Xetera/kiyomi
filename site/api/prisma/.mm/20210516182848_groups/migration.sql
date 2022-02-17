-- DropIndex
DROP INDEX "appearance_person";

-- DropIndex
DROP INDEX "appearance_image";

-- CreateTable
CREATE TABLE "group_members" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "joinDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_aliases" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bannerId" INTEGER NOT NULL,
    "thumbnailId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "member" ON "group_members"("groupId", "personId");

-- CreateIndex
CREATE UNIQUE INDEX "groups_bannerId_unique" ON "groups"("bannerId");

-- CreateIndex
CREATE UNIQUE INDEX "groups_thumbnailId_unique" ON "groups"("thumbnailId");

-- AddForeignKey
ALTER TABLE "group_members" ADD FOREIGN KEY ("personId") REFERENCES "persons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_members" ADD FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_aliases" ADD FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD FOREIGN KEY ("bannerId") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD FOREIGN KEY ("thumbnailId") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

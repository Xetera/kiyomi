-- AlterEnum
ALTER TYPE "UploadType" ADD VALUE 'AUTO_DISCOVERY';

-- CreateTable
CREATE TABLE "discovered_posts" (
    "id" SERIAL NOT NULL,
    "provider_type" TEXT NOT NULL,
    "unique_identifier" TEXT NOT NULL,
    "account_name" TEXT NOT NULL,
    "account_avatar_url" TEXT,
    "body" TEXT,
    "post_url" TEXT,
    "referencing_groups" INTEGER[],
    "referencing_people" INTEGER[],
    "original_post_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discovered_images" (
    "id" SERIAL NOT NULL,
    "mediaType" TEXT NOT NULL,
    "provider_type" TEXT NOT NULL,
    "post_id" INTEGER,
    "image_id" INTEGER,
    "unique_identifier" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discovered_image_verdicts" (
    "id" SERIAL NOT NULL,
    "discovered_image_id" INTEGER NOT NULL,
    "verdict" TEXT NOT NULL,
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discovered_image_votes" (
    "id" SERIAL NOT NULL,
    "discovered_image_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "verdict" TEXT NOT NULL,
    "reason" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "discovered_posts.provider_id" ON "discovered_posts"("provider_type", "unique_identifier");

-- CreateIndex
CREATE INDEX "discovered_image_verdicts.discovered_image" ON "discovered_image_verdicts"("discovered_image_id");

-- CreateIndex
CREATE INDEX "discovered_image_votes.user" ON "discovered_image_votes"("user_id");

-- AddForeignKey
ALTER TABLE "discovered_images" ADD FOREIGN KEY ("post_id") REFERENCES "discovered_posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discovered_images" ADD FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discovered_image_verdicts" ADD FOREIGN KEY ("discovered_image_id") REFERENCES "discovered_images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discovered_image_votes" ADD FOREIGN KEY ("discovered_image_id") REFERENCES "discovered_images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discovered_image_votes" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

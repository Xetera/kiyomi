CREATE EXTENSION cube;
-- CreateEnum
CREATE TYPE "UploadType" AS ENUM ('WEBSITE', 'TOKEN');

-- CreateEnum
CREATE TYPE "TagSource" AS ENUM ('USER');

-- CreateEnum
CREATE TYPE "FaceSource" AS ENUM ('Scan', 'Manual');

-- CreateEnum
CREATE TYPE "MimeType" AS ENUM ('PNG', 'JPG', 'SVG', 'WEBP', 'WEBM', 'AVIF', 'GIF', 'MP4');

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "compound_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "provider_type" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "access_token_expires" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "source" "TagSource" NOT NULL,
    "image_id" INTEGER NOT NULL,
    "added_by_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aliases" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "person_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persons" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "name" TEXT NOT NULL,
    "preferred_alias_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "irene_bot_id" INTEGER,
    "preferred_membership_id" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appearances" (
    "id" SERIAL NOT NULL,
    "person_id" INTEGER NOT NULL,
    "added_by_id" INTEGER NOT NULL,
    "image_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faces" (
    "id" SERIAL NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "descriptor" cube NOT NULL,
    "appearance_id" INTEGER,
    "added_by_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "image_id" INTEGER NOT NULL,
    "source" "FaceSource" NOT NULL DEFAULT E'Manual',
    "person_id" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "session_token" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bot" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_requests" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "slug" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "file_name" TEXT,
    "upload_type" "UploadType" NOT NULL,
    "mimetype" "MimeType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "p_hash" TEXT,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "palette" INTEGER[],
    "caption" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "is_nsfw" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT,
    "bytes" INTEGER NOT NULL DEFAULT 0,
    "face_scan_date" TIMESTAMP(3),
    "face_scan_request_date" TIMESTAMP(3),
    "irene_bot_id" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image_likes" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "image_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_members" (
    "id" SERIAL NOT NULL,
    "person_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_aliases" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "group_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "banner_id" INTEGER,
    "avatar_id" INTEGER,
    "irene_bot_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts.compound_id_unique" ON "accounts"("compound_id");

-- CreateIndex
CREATE INDEX "provider_account_id" ON "accounts"("provider_account_id");

-- CreateIndex
CREATE INDEX "provider_id" ON "accounts"("provider_id");

-- CreateIndex
CREATE INDEX "user_id" ON "accounts"("user_id");

-- CreateIndex
CREATE INDEX "image.index" ON "tags"("image_id");

-- CreateIndex
CREATE INDEX "user.index" ON "tags"("added_by_id");

-- CreateIndex
CREATE UNIQUE INDEX "personAlias" ON "aliases"("person_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "persons.irene_bot_id_unique" ON "persons"("irene_bot_id");

-- CreateIndex
CREATE INDEX "person.name.index" ON "persons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "persons_preferred_alias_id_unique" ON "persons"("preferred_alias_id");

-- CreateIndex
CREATE UNIQUE INDEX "appearance" ON "appearances"("person_id", "image_id");

-- CreateIndex
CREATE INDEX "face.appearanceId.index" ON "faces"("appearance_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions.session_token_unique" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions.access_token_unique" ON "sessions"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "userRole" ON "roles"("role_name", "user_id");

-- CreateIndex
CREATE INDEX "roles.user" ON "roles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users.token_unique" ON "users"("token");

-- CreateIndex
CREATE INDEX "user.token.index" ON "users"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_requests.token_unique" ON "verification_requests"("token");

-- CreateIndex
CREATE UNIQUE INDEX "images.slug_unique" ON "images"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "images.irene_bot_id_unique" ON "images"("irene_bot_id");

-- CreateIndex
CREATE INDEX "images.slug_index" ON "images"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "likedImage" ON "image_likes"("user_id", "image_id");

-- CreateIndex
CREATE UNIQUE INDEX "member" ON "group_members"("group_id", "person_id");

-- CreateIndex
CREATE UNIQUE INDEX "groups.irene_bot_id_unique" ON "groups"("irene_bot_id");

-- CreateIndex
CREATE UNIQUE INDEX "groups_banner_id_unique" ON "groups"("banner_id");

-- CreateIndex
CREATE UNIQUE INDEX "groups_avatar_id_unique" ON "groups"("avatar_id");

-- AddForeignKey
ALTER TABLE "tags" ADD FOREIGN KEY ("added_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD FOREIGN KEY ("banner_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD FOREIGN KEY ("avatar_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "persons" ADD FOREIGN KEY ("preferred_alias_id") REFERENCES "aliases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "persons" ADD FOREIGN KEY ("preferred_membership_id") REFERENCES "group_members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aliases" ADD FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_members" ADD FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_members" ADD FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_likes" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_likes" ADD FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_aliases" ADD FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appearances" ADD FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appearances" ADD FOREIGN KEY ("added_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appearances" ADD FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faces" ADD FOREIGN KEY ("added_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faces" ADD FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faces" ADD FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faces" ADD FOREIGN KEY ("appearance_id") REFERENCES "appearances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "user_accounts" (
    "id" SERIAL NOT NULL,
    "provider_type" TEXT NOT NULL,
    "provider_user_id" TEXT NOT NULL,
    "access_token_expires" TIMESTAMP(3),
    "access_token" TEXT,
    "refresh_token" TEXT,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_account.provider_type" ON "user_accounts"("provider_type");

-- CreateIndex
CREATE INDEX "user_account.user_id" ON "user_accounts"("user_id");

-- AddForeignKey
ALTER TABLE "user_accounts" ADD CONSTRAINT "user_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

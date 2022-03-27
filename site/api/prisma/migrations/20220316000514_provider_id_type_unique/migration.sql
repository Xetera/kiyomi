/*
  Warnings:

  - A unique constraint covering the columns `[provider_user_id,provider_type]` on the table `user_accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_accounts_provider_user_id_provider_type_key" ON "user_accounts"("provider_user_id", "provider_type");

/*
  Warnings:

  - You are about to drop the column `descriptor` on the `faces` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "GameParticipantKind" AS ENUM ('Player', 'Spectator');

-- CreateEnum
CREATE TYPE "GuessingGameHints" AS ENUM ('ALWAYS_ON', 'POINT_COST', 'LIMITED', 'DISABLED');

-- AlterTable
ALTER TABLE "faces" DROP COLUMN "descriptor";

-- CreateTable
CREATE TABLE "guessing_games" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "seconds_per_round" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "hints" "GuessingGameHints" NOT NULL DEFAULT E'POINT_COST',
    "start_date" TIMESTAMP(3) NOT NULL,
    "finish_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guessing_games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guessing_game_participants" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "game_id" INTEGER NOT NULL,
    "type" "GameParticipantKind" NOT NULL DEFAULT E'Player',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guessing_game_participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guessing_game_rounds" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guessing_game_rounds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guessing_game_targets" (
    "id" SERIAL NOT NULL,
    "answer_id" INTEGER,
    "round_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guessing_game_targets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guessing_game_guesses" (
    "id" SERIAL NOT NULL,
    "round_id" INTEGER NOT NULL,
    "target_id" INTEGER NOT NULL,
    "person_guess_id" INTEGER,
    "user_id" INTEGER,
    "hint_used" BOOLEAN NOT NULL DEFAULT false,
    "guessed_at" TIMESTAMP(3) NOT NULL,
    "guess_ms" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guessing_game_guesses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "guessingGameParticipantUser" ON "guessing_game_participants"("user_id");

-- CreateIndex
CREATE INDEX "guessingGameParticipantGame" ON "guessing_game_participants"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "guessing_game_participants_user_id_game_id_key" ON "guessing_game_participants"("user_id", "game_id");

-- CreateIndex
CREATE INDEX "guessinGameRoundGame" ON "guessing_game_rounds"("game_id");

-- CreateIndex
CREATE INDEX "guessinGameTargetRound" ON "guessing_game_targets"("round_id");

-- CreateIndex
CREATE INDEX "guessingGameGuessRound" ON "guessing_game_guesses"("round_id");

-- CreateIndex
CREATE INDEX "guessingGameGuessTarget" ON "guessing_game_guesses"("target_id");

-- AddForeignKey
ALTER TABLE "guessing_games" ADD CONSTRAINT "guessing_games_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guessing_game_participants" ADD CONSTRAINT "guessing_game_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guessing_game_participants" ADD CONSTRAINT "guessing_game_participants_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "guessing_games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guessing_game_rounds" ADD CONSTRAINT "guessing_game_rounds_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "guessing_games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guessing_game_targets" ADD CONSTRAINT "guessing_game_targets_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guessing_game_targets" ADD CONSTRAINT "guessing_game_targets_round_id_fkey" FOREIGN KEY ("round_id") REFERENCES "guessing_game_rounds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guessing_game_guesses" ADD CONSTRAINT "guessing_game_guesses_round_id_fkey" FOREIGN KEY ("round_id") REFERENCES "guessing_game_rounds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guessing_game_guesses" ADD CONSTRAINT "guessing_game_guesses_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "guessing_game_targets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guessing_game_guesses" ADD CONSTRAINT "guessing_game_guesses_person_guess_id_fkey" FOREIGN KEY ("person_guess_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guessing_game_guesses" ADD CONSTRAINT "guessing_game_guesses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

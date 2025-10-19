-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('easy', 'medium', 'hard');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('javascript', 'python', 'cpp');

-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL,
    "playerName" TEXT,
    "difficulty" "Difficulty" NOT NULL,
    "language" "Language" NOT NULL,
    "completionTime" INTEGER NOT NULL DEFAULT 0,
    "totalAttempts" INTEGER NOT NULL DEFAULT 0,
    "totalHints" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Score_difficulty_idx" ON "Score"("difficulty");

-- CreateIndex
CREATE INDEX "Score_completionTime_idx" ON "Score"("completionTime");

-- CreateIndex
CREATE INDEX "Score_completedAt_idx" ON "Score"("completedAt");

-- CreateIndex
CREATE INDEX "Score_language_idx" ON "Score"("language");

-- CreateIndex
CREATE INDEX "Score_difficulty_completionTime_idx" ON "Score"("difficulty", "completionTime");

-- CreateIndex
CREATE INDEX "Score_language_completionTime_idx" ON "Score"("language", "completionTime");

-- CreateTable
CREATE TABLE "RecruitmentPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "memo" TEXT,
    "discordUrl" TEXT,
    "kakaoUrl" TEXT,
    "dmUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RecruitmentSlot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "postId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "class" TEXT,
    "specId" TEXT,
    "count" INTEGER NOT NULL,
    CONSTRAINT "RecruitmentSlot_postId_fkey" FOREIGN KEY ("postId") REFERENCES "RecruitmentPost" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "RecruitmentSlot_postId_idx" ON "RecruitmentSlot"("postId");

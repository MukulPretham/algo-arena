/*
  Warnings:

  - You are about to drop the column `problemId` on the `Topic` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[topicName]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_problemId_fkey";

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "problemId";

-- CreateTable
CREATE TABLE "ProblemToTopic" (
    "id" SERIAL NOT NULL,
    "problemId" TEXT NOT NULL,
    "topicId" INTEGER NOT NULL,

    CONSTRAINT "ProblemToTopic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Topic_topicName_key" ON "Topic"("topicName");

-- AddForeignKey
ALTER TABLE "ProblemToTopic" ADD CONSTRAINT "ProblemToTopic_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemToTopic" ADD CONSTRAINT "ProblemToTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

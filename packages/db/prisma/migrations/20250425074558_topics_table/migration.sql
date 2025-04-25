/*
  Warnings:

  - You are about to drop the column `topic` on the `Problem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "topic";

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "topicName" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

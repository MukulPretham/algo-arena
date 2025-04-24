/*
  Warnings:

  - Added the required column `problemId` to the `TestCases` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TestCases" DROP CONSTRAINT "TestCases_id_fkey";

-- AlterTable
ALTER TABLE "TestCases" ADD COLUMN     "problemId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TestCases" ADD CONSTRAINT "TestCases_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

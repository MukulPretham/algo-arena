/*
  Warnings:

  - Added the required column `score` to the `ContestParticipantLogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContestParticipantLogs" ADD COLUMN     "score" INTEGER NOT NULL;

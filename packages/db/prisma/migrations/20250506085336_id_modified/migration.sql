/*
  Warnings:

  - The primary key for the `ContestParticipantLogs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ContestParticipantLogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ContestParticipantLogs" DROP CONSTRAINT "ContestParticipantLogs_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ContestParticipantLogs_pkey" PRIMARY KEY ("contestId", "userId");

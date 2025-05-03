-- CreateTable
CREATE TABLE "Contest" (
    "id" TEXT NOT NULL,
    "namen" TEXT NOT NULL,
    "starts" TIMESTAMP(3) NOT NULL,
    "ends" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContestQuestionLogs" (
    "id" SERIAL NOT NULL,
    "contestId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,

    CONSTRAINT "ContestQuestionLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContestParticipantLogs" (
    "id" SERIAL NOT NULL,
    "contestId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ContestParticipantLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contest_namen_key" ON "Contest"("namen");

-- AddForeignKey
ALTER TABLE "ContestQuestionLogs" ADD CONSTRAINT "ContestQuestionLogs_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestQuestionLogs" ADD CONSTRAINT "ContestQuestionLogs_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestParticipantLogs" ADD CONSTRAINT "ContestParticipantLogs_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestParticipantLogs" ADD CONSTRAINT "ContestParticipantLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

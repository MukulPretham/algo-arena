-- CreateTable
CREATE TABLE "Problem" (
    "id" TEXT NOT NULL,
    "statement" TEXT NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestCases" (
    "id" TEXT NOT NULL,
    "testCaseInput" TEXT NOT NULL,
    "testCaseOutput" TEXT NOT NULL,

    CONSTRAINT "TestCases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Problem_statement_key" ON "Problem"("statement");

-- AddForeignKey
ALTER TABLE "TestCases" ADD CONSTRAINT "TestCases_id_fkey" FOREIGN KEY ("id") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

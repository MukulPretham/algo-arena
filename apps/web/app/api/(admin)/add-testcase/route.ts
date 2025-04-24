import { NextRequest, NextResponse } from "next/server";
import { client } from "@repo/db/client";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const problemId = body?.problemId;
    const testCaseInput = body?.testCaseInput;
    const testCaseOutput = body?.testCaseOutput;
    const explanation = body?.explanation;
    

    try {
        const currProb = await client.testCases.create({
            data: {
                problemId: problemId,
                testCaseInput: testCaseInput,
                testCaseOutput: testCaseOutput,
                explanation: explanation
            }
        });
        const allTestCases = await client.testCases.findMany({
            where:{
                problemId: problemId
            }
        });
        return NextResponse.json({
            status: 200,
            message: "Added !!",
            cases: allTestCases
        });
    } catch (err) {
        return NextResponse.json(
            { status: 500 }
        )
    }
}
import { NextRequest, NextResponse } from "next/server";
import { client } from "@repo/db/client";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const title = body?.title;
    const statement = body?.statement;
    const type = body?.type;
    const topic = body?.topic;
    const testCaseInput = body?.testCaseInput;
    const testCaseOutput = body?.testCaseOutput;
    const explanation = body?.explanation

    try {
        const currProb = await client.problem.create({
            data: {
                title: title,
                statement: statement,
                type: type,
            }
        });
        await client.testCases.create({
            data: {
                problemId: currProb.id,
                testCaseInput: testCaseInput,
                testCaseOutput: testCaseOutput,
                explanation: explanation
            }
        });
        const currTopic = await client.topic.upsert({
            where:{
                topicName: topic
            },
            update: { },
            create:{topicName: topic}
            
        })
        
        await client.problemToTopic.create({
            data:{
                problemId: currProb.id,
                topicId: currTopic.id
            }
        })
        return NextResponse.json({
            status: 200,
            message: "Added !!",
            problemId: currProb.id
        });
    } catch (err) {
        return NextResponse.json(
            { status: 500,error: `${err}` }
        )
    }
}
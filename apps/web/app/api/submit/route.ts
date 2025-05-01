import { NextRequest, NextResponse } from "next/server";
import fs from "fs"
import { client } from "@repo/db/client"

export async function POST(req: NextRequest) {
    const body = await req.json();
    if (!req.body) {
        return NextResponse.json({ error: "bad request" })
    }

    const id = body.id;

    if (!body) {
        return NextResponse.json({ error: "bad request" })
    }

    try {
        const currProb = await client.problem.findFirst({
            where: {
                id: id
            }
        });

        const slug = currProb?.title;

        //Reading all inpust and outputs of test cases
        const inputsDir = fs.readdirSync(`../problems/${slug}/inputs`);
        let inputs = inputsDir.map(testCaseFile => fs.readFileSync(`../problems/${slug}/inputs/${testCaseFile}`));
        

        const outputsDir = fs.readdirSync(`../problems/${slug}/outputs`);
        let outputs = outputsDir.map(testCaseFile => fs.readFileSync(`../problems/${slug}/outputs/${testCaseFile}`));
        

        //Forming batches to send req to rapid api
        const batchSkeleton = {
            "language_id": body.payload.language_id,
            "source_code": body.payload.source_code,
        }

        const batchLayer_1 = inputs.map(input => {
            return {
                ...batchSkeleton,
                "stdin": `${input.toString()}`
            }
        });

        const finalBatch = [];
        let counter = 0;
        for (const output of outputs) {
            finalBatch.push({
                ...batchLayer_1[counter],
                "expected_output": `${output.toString()}`
            })
        }
        // console.log(finalBatch);
        const response = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/batch`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-rapidapi-host": `${process.env.NEXT_PUBLIC_RapidApiUrl}`,
                "x-rapidapi-key": `${process.env.NEXT_PUBLIC_RapidApiKey}`
            },
            body: JSON.stringify({
                "submissions": finalBatch
            })
        });

        const pre_tokens: any[] = await response.json();
        const tokens = pre_tokens.map(tokenObj => tokenObj?.token)
        
        return NextResponse.json(tokens);
        
    } catch (err) {
        console.log(err);
    }
}

import { NextRequest, NextResponse } from "next/server";
import fs from "fs"
import { client } from "@repo/db/client"
import { json } from "stream/consumers";

export async function POST(req: NextRequest) {
    const body = await req.json();
    
    if (!req.body) {
        return NextResponse.json({ error: "bad request" })
    }

    const problemId = body.problemId;
    const username = body.username;
    const contestId = body?.contestId;
    
    if (!problemId || !username) {
        return NextResponse.json({ error: "no username and password given" })
    }

    try {
        const currUser = await client.user.findFirst({
            where: {
                username: username
            }
        })
        if (!currUser) {
            return NextResponse.json({ message: "bad req" })
        }
        const currProb = await client.problem.findFirst({
            where: {
                id: problemId
            }
        });

        const slug = currProb?.title;

        //Reading all inpust and outputs of test cases
        const inputsDir = fs.readdirSync(`../problems/${slug}/inputs`);
        let inputs = inputsDir.map(testCaseFile => fs.readFileSync(`../problems/${slug}/inputs/${testCaseFile}`));


        const outputsDir = fs.readdirSync(`../problems/${slug}/outputs`);
        let outputs = outputsDir.map(testCaseFile => fs.readFileSync(`../problems/${slug}/outputs/${testCaseFile}`));


        // inputs.map((input)=>console.log(input.toString()));
        // outputs.map((output)=>console.log(output.toString()));
        

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
        // console.log(batchLayer_1);

        const finalBatch = [];
        let counter = 0;
        for (const output of outputs) {
            finalBatch.push({
                ...batchLayer_1[counter++],
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

        //Creating an submissions entry in DB.
        let submission;
        if(contestId){
            submission = await client.submissions.create({
                data: {
                    userId: currUser.id,
                    problemId: problemId,
                    status: "Pending",
                    type: "contest",
                    contestId: contestId
                }
            });
        }else{
            submission = await client.submissions.create({
                data: {
                    userId: currUser.id,
                    problemId: problemId,
                    status: "Pending"
                }
            });
        }

        const pre_tokens: any[] = await response.json();
        
        const tokens = pre_tokens.map(tokenObj => tokenObj?.token);

        console.log(tokens);
        
        return NextResponse.json({
            status: "submitted",
            id: submission.id,
            tokens: tokens
        });

    } catch (err) {
        return NextResponse.json({
            error: "server error"
        })
    }
}

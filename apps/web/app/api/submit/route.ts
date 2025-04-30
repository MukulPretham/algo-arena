import { NextRequest, NextResponse } from "next/server";
import fs from "fs"
import { client } from "@repo/db/client"

export async function POST(req: NextRequest) {
    const body = await req.json();
    if (!req.body) {
        return NextResponse.json({ error: "bad request" })
    }

    if (!body) {
        return NextResponse.json({ error: "bad request" })
    }

    if (!body.code || !body.lang || !body.problemId) {
        return NextResponse.json({ error: "bad request" })
    }

    console.log(body?.problemId);
    
    try {
        const currProblem = await client.problem.findFirst({
            where: {
                id: body?.problemId
            }
        });
        
        const inputsDir = fs.readdirSync(`../problems/${currProblem?.title}/inputs`);
        const inputs: any = [];

        inputsDir.forEach(file => {
            const content = fs.readFileSync(`../problems/${currProblem?.title}/inputs/${file}`);
            inputs.push(content);
        })

        const outputsDir = fs.readdirSync(`../problems/${currProblem?.title}/outputs`);
        const outputs: any = [];

        outputsDir.forEach(file => {
            const content = fs.readFileSync(`../problems/${currProblem?.title}/outputs/${file}`);
            outputs.push(content);
        })

        return NextResponse.json({
            inputs: inputs,
            outputs: outputs
        });

    } catch (err) {
        return NextResponse.json({
            error: err
        })
    }
    
}
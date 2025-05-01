import { NextRequest, NextResponse } from "next/server";
import fs from "fs"
import { client } from "@repo/db/client"

export async function POST(req: NextRequest) {
    const body = await req.json();
    NextResponse.json(body);
    
    if (!body) {
        return NextResponse.json({ error: "bad request" })
    }
    if (!body.tokens) {
        return NextResponse.json({ error: "bad request" })
    }
    if (!Array.isArray(body.tokens)) {
        return NextResponse.json({ error: "tokens must be an array" });
    }
    
    // const id = body.id;
    const tokens: string[] = body.tokens;
    console.log(tokens);
    if(!tokens){
        return NextResponse.json({ error: "bad request" })
    }
    try {
        // const currProb = await client.problem.findFirst({
        //     where: {
        //         id: id
        //     }
        // });

        // const slug = currProb?.title;

        const resultPromises = tokens.map((token)=>{
            return fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
                headers: {
                    "Content-Type": "application/json",
                    "x-rapidapi-host": `${process.env.NEXT_PUBLIC_RapidApiUrl}`,
                    "x-rapidapi-key": `${process.env.NEXT_PUBLIC_RapidApiKey}`
                }
            }).then(data => data.json());
        });

        const results = await Promise.all(resultPromises)

        for (const result of results) {
            if(result.status.description === "Processing"){
                return NextResponse.json({
                    status: "pending"
                })
            };
        }
        
        return NextResponse.json(results);
        
    } catch (err) {
        console.log(err);
    }
}

import { NextRequest, NextResponse } from "next/server";
import { client } from "@repo/db/client"

export async function POST(req: NextRequest) {
    
    const body = await req.json();
    const submissionId = body?.submissionId;
    const tokens: string[] = body?.tokens;
   
    const id : string = submissionId ? decodeURIComponent(submissionId): " ";
    try{
        
        let currSubmission = await client.submissions.findFirst({
            where:{
                id: id
            }
        });
        const resultsPromises = tokens.map((token)=>{
            return fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
                headers: {
                    "Content-Type": "application/json",
                    "x-rapidapi-host": `${process.env.NEXT_PUBLIC_RapidApiUrl}`,
                    "x-rapidapi-key": `${process.env.NEXT_PUBLIC_RapidApiKey}`
                }
            }).then(data => data.json());
        });

        const results = await Promise.all(resultsPromises);
        console.log(results);

        for (const result of results) {
            if (result.status.description === "Wrong Answer") {
                await client.submissions.update({
                    where: {
                        id: submissionId
                    },
                    data: {
                        status: "Wrong Answer"
                    }
                });
                currSubmission =  await client.submissions.findFirst({
                    where:{
                        id: id
                    }
                });
                
                return NextResponse.json({
                    STATUS: currSubmission?.status
                })
            };
            
            if (result.status.description === "Accepted") {
                await client.submissions.update({
                    where: {
                        id: submissionId
                    },
                    data: {
                        status: "Accepted"
                    }
                });
            };
            if (result.status.description === "Processing") {
                await client.submissions.update({
                    where: {
                        id: submissionId
                    },
                    data: {
                        status: "Processing"
                    }
                });
            };
        }
        currSubmission =  await client.submissions.findFirst({
            where:{
                id: id
            }
        });
        
        // return NextResponse.json({
        //     STATUS: currSubmission?.status
        // })
        return NextResponse.json(results);
    }catch(err){
        return NextResponse.json({status: 500,message: "Internal server error"})
    }
    
}



import { client } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {

    const body: {
        username: string,
        contestId: string
    } = await req.json();

    if(!body || !body.username || !body.contestId){
        return NextResponse.json({
            status: 200,
            error: "Bad request"
        });
    }

    try{
        const currUser = await client.user.findFirst({
            where: {
                username: body.username
            }
        });
        const currContest = await client.contest.findFirst({
            where:{
                id: body.contestId
            }
        });

        if(!currContest || !currUser){
            return NextResponse.json({
                status: 500,
                error: "user or contets is invalid"
            })
        }
        
        await client.contestParticipantLogs.create({
            data: {
                contestId: currContest?.id,
                userId: currUser?.id,
                score: 0
            }
        });

        return NextResponse.json({
            status: 200,
            message: `You have joined in contest ${currContest.namen}`
        })
        
    }catch(err){
        return NextResponse.json({
            status: 500,
            error: "internal server error"
        })
    }
}
import { client } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {username, contestId} = await req.json();

    try{
        const currUser = await client.user.findFirst({
            where:{
                username:username
            }
        });
        const participated = await client.contestParticipantLogs.findFirst({
            where:{
                userId: currUser?.id,
                contestId: contestId
            }
        });console.log(participated);

        if(participated?.userId){
            return NextResponse.json({
                message: "true",
                score: participated.score
            });
        }
        return NextResponse.json({
            message: "false"
        });
    }catch(err){
        return NextResponse.json({
            status: 500,
            message: "Intrnal server error"
        });
    }
}
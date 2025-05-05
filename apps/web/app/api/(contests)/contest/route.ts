import { client } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try{
        const allContests = await client.contest.findMany();
        return NextResponse.json(allContests);
    }catch(err){
        return NextResponse.json({
            status: 500,
            message: "Internal server error"
        });
    }
}
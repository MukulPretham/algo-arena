import { client } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const {pathname} = req.nextUrl;
    const id = pathname.split("/")[3];

    try{
        const currContest = await client.contest.findFirst({
            where: {
                id: id
            }
        });
        if(!currContest){
            return NextResponse.json({
                status: 404,
                message: "contest do not exist"
            });
        }
        return NextResponse.json(currContest);
    }catch(err){
        return NextResponse.json({
            status: 500,
            message: "Intrnal server error"
        });
    }

    return NextResponse.json(id);
}
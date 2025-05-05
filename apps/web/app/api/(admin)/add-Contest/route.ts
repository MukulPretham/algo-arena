import { NextRequest, NextResponse } from "next/server";
import { client } from "@repo/db/client";
import { DateType } from "../../../../utils/types";


export async function POST(req:NextRequest) {
    if(!req.body){
        return NextResponse.json({
            error: "Bad Request"
        });
    }
    const body = await req.json();
    const contestName:string = body.name
    const datePayload:{
        start: DateType,
        ends: DateType
    } = body.datePayload;
    if(!body || !contestName || !datePayload){
        return NextResponse.json({
            error: "Bad Request"
        });
    }
    console.log(new Date(datePayload.start.year,datePayload.start.month,datePayload.start.day,datePayload.start.hour,datePayload.start.minute,datePayload.start.seconds));
    console.log(new Date(datePayload.ends.year,datePayload.ends.month,datePayload.ends.day,datePayload.ends.hour,datePayload.ends.minute,datePayload.ends.seconds));
    try{
        const currContest = await client.contest.create({
            data: {
                namen: contestName,
                starts: new Date(datePayload.start.year,datePayload.start.month,datePayload.start.day,datePayload.start.hour,datePayload.start.minute,datePayload.start.seconds),
                ends: new Date(datePayload.ends.year,datePayload.ends.month,datePayload.ends.day,datePayload.ends.hour,datePayload.ends.minute,datePayload.ends.seconds)
            }
        });
        return NextResponse.json({
            status: 200,
            message: `Contest had been created under the id: ${currContest.id}`
        })
    }catch(err){
        // console.log(err);
        return NextResponse.json({
            status: 500,
            error: err
        })
    }
}
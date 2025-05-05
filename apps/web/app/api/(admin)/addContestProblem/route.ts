import { client } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {contestName, problemName} = await req.json();
    if(!contestName || !problemName){
        return NextResponse.json({
            message: "Nad Request"
        });
    }
    try{
        const currContest = await client.contest.findFirst({
            where: {
                namen: contestName
            }
        });
        const currProblem = await client.problem.findFirst({
            where:{
                title: problemName
            }
        });
        if(!currContest || !currProblem){
            return NextResponse.json({
                status: 404,
                message: "problem or contest does'nt exist"
            });
        }
        await client.contestQuestionLogs.create({
            data:{
                problemId: currProblem.id,
                contestId: currContest.id
            }
        });
        return NextResponse.json({
            status: 200,
            message: "problem added to contets sucessfully"
        });
    }catch(err){
        return NextResponse.json({
            status: 500,
            message: "Internal server error"
        });
    }
}
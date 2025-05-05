import { client } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const {pathname} = req.nextUrl;
    const id = pathname.split("/")[3];

    try{
        const contestProblems = await client.contestQuestionLogs.findMany({
            where: {
                contestId: id
            }
        });
        if(!contestProblems){
            return NextResponse.json({
                status: 404,
                message: "contest do not exist"
            });
        }
        const promises = contestProblems.map((problemLog)=>{
            return client.problem.findFirst({
                where: {
                    id: problemLog.problemId
                }
            });
        });
        const problems = await Promise.all(promises);
        return NextResponse.json(problems);
    }catch(err){
        return NextResponse.json({
            status: 500,
            message: "Intrnal server error"
        });
    }

    return NextResponse.json(id);
}
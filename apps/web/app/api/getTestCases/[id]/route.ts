import { NextRequest, NextResponse } from "next/server";
import { SearchParams } from "next/dist/server/request/search-params";
import { client } from "@repo/db/client"
export async function GET(req: NextRequest) {
    const {pathname} = req.nextUrl;
    
    if(!pathname){
        return  NextResponse.json({
        })
    }
    
    const problemIdString  = pathname.split("/")[3];
    const problemId : string = problemIdString ? decodeURIComponent(problemIdString): " ";
    console.log(problemId);
    try{
        
        const currProblem = await client.testCases.findMany({
            where:{
                problemId: problemId
            }
        });
        
        
        return NextResponse.json(currProblem)
    }catch(err){
        return NextResponse.json({
            messsage: err
        })
    }
}
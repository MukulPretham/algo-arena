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
    
    try{
        
        const currProblem = await client.problem.findFirst({
            where:{
                id: problemId
            }
        });
        
        
        return NextResponse.json(currProblem)
    }catch(err){
        return NextResponse.json({
            messsage: err
        })
    }
}
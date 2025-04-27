import { NextRequest, NextResponse } from "next/server";
import { SearchParams } from "next/dist/server/request/search-params";
import { client } from "@repo/db/client"
export async function GET(req: NextRequest) {
    const {pathname} = req.nextUrl;
    if(!pathname){
        return  NextResponse.json({
        })
    }
    
    const topicString  = pathname.split("/")[3];
    const topic : string = topicString ? decodeURIComponent(topicString): " ";
    if(topicString=="*"){
        try{
            const allProbs = await client.problem.findMany({});
            return NextResponse.json(allProbs);
        }catch(err){
            return NextResponse.json({status: 500, message: err});
        }
        
    }
    
    try{
        const currTopic= await client.topic.findFirst({
            where:{
                topicName: topic
            }
        });
        const currProblemIds = await client.problemToTopic.findMany({
            where:{
                topicId: currTopic?.id
            }
        });
        const promises = currProblemIds.map((problemRef)=>client.problem.findFirst({
            where:{
                id: problemRef.problemId
            }
        }));
        const problems = await Promise.all(promises);
        return NextResponse.json(problems)
    }catch(err){
        return NextResponse.json({
            messsage: err
        })
    }
}
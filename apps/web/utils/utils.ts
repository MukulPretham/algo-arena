import { client } from "@repo/db/client"
import fs from "fs";

export async function getAllTopics(){
    try{
        const data = client.topic.findMany({});
        return data
    }catch(err){
        return [];
    }
}


export async function getAllProblems(){
    try{
        const data = client.problem.findMany({});
        return data
    }catch(err){
        return [];
    }
}

export async function verify(id: string){
    try{
        const currProb = await client.problem.findFirst({
            where:{
                id: id
            }
        });
        console.log(currProb)
        const slug = currProb?.title;
        const testCaesDir = fs.readdirSync(`../../problems/Two Sum/inputs`);
        console.log(testCaesDir);
    }catch(err){
        console.log(err)
    }
}

await verify("3ca6e558-46fe-4770-80f5-904da5b4043a");
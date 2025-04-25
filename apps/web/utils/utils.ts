import { client } from "@repo/db/client"

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
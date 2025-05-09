import { client } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const username = body?.username;
    try {
        const currUser = await client.user.findFirst({
            where: {
                username: username
            }
        });
        const allSubmissions = await client.submissions.findMany({
            where: {
                userId: currUser?.id
            }
        });
        const finalPromises = allSubmissions.map((submission) => {
            return client.problem.findFirst({
                where: {
                    id: submission.problemId
                }
            })
        });
        const finalProblems = await Promise.all(finalPromises);
        let final = [];
        let counter = 0;
        for (const problem of finalProblems) {
            final.push({
                ...finalProblems[counter],
                status: allSubmissions[counter]?.status,
                submissionType : allSubmissions[counter]?.type,
                contest: allSubmissions[counter]?.contestId
            })
            counter++
        }
        return NextResponse.json({
            user: { ...currUser },
            submissions: [...final]
        });
    } catch (err) {
        console.log("database error");
        NextResponse.json({
            status: 200,
            message: "Internal server error"
        });
    }
}
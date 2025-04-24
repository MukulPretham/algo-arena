import { NextRequest, NextResponse } from "next/server";
import { client } from "@repo/db/client";
import { error } from "console";

export async function POST(req:NextRequest) {
    const body = await req.json()
    const username = body.username;
    const email = body.email;
    const password = body.password;
    if(!username || !password || !email){
        return NextResponse.json(
            {error: "Invalid format"}
        );
    }
    try{
        await client.user.create({
            data:{
                username: username,
                email: email,
                password: password
            }
        });
        return NextResponse.json({
            message: "account created"
        });
    }catch(err){
        return NextResponse.json(
            {error: "server error"},
            {status: 500},

        );
    }
}
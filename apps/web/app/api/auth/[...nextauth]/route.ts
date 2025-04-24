import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { client } from "@repo/db/client"
import GoogleProvider from "next-auth/providers/google";

import { use } from "react";



const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'email',
    
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            //@ts-ignore
            async authorize(credentials, req) {
                let username = credentials?.username;
                
                let password = credentials?.password;
                if(!username || !password ){
                    return null;
                }
                console.log(username);
                //Hit the database and verigy the details
                try{
                    
                    const currUser = await client.user.findFirst({
                        where: {
                            username: username,
                            password: password
                        }
                    });
                    if(!currUser){
                        return null;
                    }
                    console.log(currUser);
                    return {
                        id: currUser?.id,
                        name: currUser?.username,
                        email: currUser?.email
                    }
                }catch(err){
                    return null;
                }
            }
        }),
    ],
    
    secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }

// import { NextRequest, NextResponse } from "next/server"

// export function GET(req: NextRequest, { params }: { params: { nextAuth: string[] } }) {
//     console.log(params.nextAuth)
//     return NextResponse.json({
//         message: "Handler"
//     })
// }
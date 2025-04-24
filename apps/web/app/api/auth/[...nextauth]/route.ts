import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";

import { use } from "react";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'email',
    
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                email: { label: "email", type: "text", placeholder: "email" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            //@ts-ignore
            async authorize(credentials, req) {
                let username = credentials?.username;
                let email = credentials?.email;
                let password = credentials?.password;
                console.log(username);
                //Hit the database and verigy the details
                let user = {
                    id: 2,
                    name : "Mukul",
                    email: "Mukulpretham@gmail.com"
                }
                if(user){
                    return user
                }
                return null;
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
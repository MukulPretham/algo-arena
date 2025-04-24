"use client"
import { signIn } from 'next-auth/react';
import React, { useRef, useState } from 'react'

const page = () => {

    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [message, setMessage] = useState("");

    const signUpHandler = async ()=>{
        const response = await fetch("api/auth/signup",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body:JSON.stringify({
                username : usernameRef.current?.value,
                email : emailRef.current?.value,
                password : passwordRef.current?.value
            })
        });
        console.log(response);
        const data = await response.json();
        if(data.message){
            setMessage(data.message);
            return
        }
        if(data.error){
            setMessage(data.error);
            return;
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center px-4">
            <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Create your CodeArena account</h1>
                <p className="text-gray-500 mb-8">Join and start climbing the leaderboard today.</p>
                {message && <div>{message}</div>}
                <div className="space-y-6 text-left">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                        ref={usernameRef}
                            type="text"
                            id="name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                        ref={emailRef}
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                        ref={passwordRef}
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Create a strong password"
                        />
                    </div>

                    <button
                    onClick={signUpHandler}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                </div>

                <p className="mt-6 text-sm text-gray-500">
                    Already have an account?{" "}
                    <a onClick={()=> signIn()} className="text-blue-600 hover:underline">Sign in</a>
                </p>
            </div>
        </div>
    )
}

export default page
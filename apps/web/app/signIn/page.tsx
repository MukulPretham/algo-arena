"use client"
import { signIn } from 'next-auth/react';
import React, { useRef } from 'react'

type Props = {}

const page = (props: Props) => {

    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const signinHandler = async () => {
        const res = await signIn("credentials", {
            username: usernameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value
        })
        console.log(usernameRef.current?.value);
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center px-4">
            <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Sign in to CodeArena</h1>
                <p className="text-gray-500 mb-8">Welcome back! Compete, learn, and level up.</p>

                <div className="space-y-6 text-left">
                    <div>
                        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            ref={usernameRef}
                            type="text"
                            id="username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="username"
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
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        onClick={signinHandler}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                </div>

                <p className="mt-6 text-sm text-gray-500">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    )
}

export default page
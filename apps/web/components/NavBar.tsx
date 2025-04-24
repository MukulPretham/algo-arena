"use client"
import React from 'react'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const NavBar = () => {
    const router = useRouter();
    // const session = useSession();
    // console.log(session);
    return (
        <div style={{
            border: "2px solid black",
            height: "8%",
            backgroundColor: "black",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "55px"
        }}>
            <span style={{ cursor: "pointer" }}>Contests</span>
            <span style={{ cursor: "pointer" }}>Problem sets</span>
            <span style={{ cursor: "pointer" }}>Leadrboard</span>
            <button
                onClick={()=>{
                    signOut({ callbackUrl: "/" })
    }}
                style={{
                    position: "fixed",
                    right: "0px",
                    paddingRight: "10px",
                    cursor: "pointer"
                }}
            >LogOut</button>
        </div>
    )
}

export default NavBar
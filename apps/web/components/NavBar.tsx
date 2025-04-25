"use client"
import React from 'react'
import { signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
const NavBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    let styles = {};
    styles = {
        cursor: "pointer",
        color: `red`
    }
    
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
            <span onClick={()=>{router.push("/contests")}} style={pathname == "/contests" ? styles : { cursor: "pointer" }  }>Contests</span>
            <span onClick={()=>{router.push("/problem-sets")}} style={pathname == "/problem-sets" || pathname.split("/")[1] === "problem-sets"  ? styles : { cursor: "pointer" }  }>Problem sets</span>
            <span onClick={()=>{router.push("/leaderboard")}} style={pathname == "/leaderboard" ? styles : { cursor: "pointer" }  } >Leadrboard</span>
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
            >Log-Out</button>
        </div>
    )
}

export default NavBar
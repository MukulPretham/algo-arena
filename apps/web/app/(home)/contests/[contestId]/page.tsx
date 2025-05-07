"use client"
import { useParams, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { Contest, Problem } from '../../../../utils/types';
import ProblemCard from '../../../../components/ProblemCard';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const page = () => {
    const params = useParams();
    const [joined, setJoined] = useState<boolean>(false);
    const [currContest, setCurrContest] = useState<Contest>();
    const [contestProblems, setContestProblems] = useState<Problem[]>();
    const sessions = useSession();
    const username = sessions.data?.user?.name
    useEffect(() => {
        async function getContestDetails() {
            const response = await fetch(`/api/getContest/${params.contestId}`);
            const data = await response.json();
            console.log(data);
            setCurrContest(data);
        }
        async function getContestProblems() {
            const response = await fetch(`/api/contest/${params.contestId}`);
            const data = await response.json();
            console.log(data);
            setContestProblems(data);
        }
        async function checkUser() {
            const response = await fetch(`/api/check-participant`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    contestId: params?.contestId
                })
            });
            const data = await response.json();
            if (data.message == "true") {
                setJoined(true);
            } else {
                setJoined(false);
            }
            console.log(data);
        }
        getContestDetails();
        getContestProblems();
        checkUser();
    }, []);

    const joinHandler = async () => {
        const res = await fetch("/api/join-Contest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                contestId: params?.contestId
            })
        })
        const data = await res.json();
        console.log(data);
        if (data.status == 200) {
            setJoined(true);
        }
    }

    console.log(params.contestId);
    return (

        <div style={{ height: "92%", overflow: "scroll" }}>
            <Suspense fallback={<div>Loading</div>}>
                <h2>{currContest?.namen}</h2>
                <p>Start Date: {currContest?.starts && new Date(currContest?.starts).toUTCString()}</p>
                <p>End Date: {currContest?.ends && new Date(currContest?.ends).toUTCString()}</p>
                {joined && currContest?.starts && new Date() >= new Date(currContest?.starts) ? contestProblems?.map((problem) =>
                    <Link key={problem.id.toString()} href={`./solve?id=${problem.id}&contestId=${params.contestId}`}><div key={problem.id.toString()}><ProblemCard title={problem.title} type={problem.type} /></div></Link>
                ) : <div> <span>Contest has not started or you have not joined</span></div>}
                {!joined && <button onClick={joinHandler} style={{ marginLeft: "3px", padding: "5px", border: "2px solid black" }}>Join</button>}
            </Suspense>
        </div>
    )
}

export default page
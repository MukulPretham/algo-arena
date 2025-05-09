"use client"
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { Profile, Submsiions } from '../../../utils/types';

const page = () => {
    const session = useSession();
    const username = session.data?.user?.name;

    const [info, setInfo] = useState<Profile>();
    const [practiceSubmissions, setPracticeSubmissions] = useState<Submsiions[]>([])
    const [contestSubmissions, setContestSubmissions] = useState<Submsiions[]>([])

    useEffect(() => {
        (async () => {
            const res = await fetch("api/getProfile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username
                })
            });
            const data = await res.json();
            setInfo(data);
            console.log(data);
        })()
    }, []);

    useEffect(() => {
        const practice = info?.submissions.filter(submission => submission.submissionType === "practice");
        if (!practice) {
            return
        }
        setPracticeSubmissions(practice);
        const contest = info?.submissions.filter(submission => submission.submissionType === "contest");
        if (!contest) {
            return
        }
        setContestSubmissions(contest);
    }, [info]);

    return (
        <div className="profile-container">
            <h1 style={{fontSize: "18px", fontWeight: "bold"}} className="profile-name">Username: {info?.user?.username}</h1>
            <p style={{fontSize: "18px"}} className="profile-email">email: {info?.user.email}</p>

            <div style={{display: "flex",gap: "15px"}}>
                <div style={{height: "500px",overflow: "scroll"}} className="submissions-section">
                    <h1 style={{ fontSize: "24px" }}>Practice Submissions</h1>
                    {practiceSubmissions.map(submission => <div key={submission.id + 100 + Math.random() * 100000}
                        style={{
                            padding: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            backgroundColor: '#fff',
                            width: '500px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            margin: '10px',
                        }}
                    >
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                            {submission.title}
                        </h2>
                        <p style={{ fontSize: '14px', margin: '4px 0' }}>
                            <span style={submission.type === "Easy" ? { color: 'green', fontWeight: '500' } : submission.type === "Medium" ? { color: 'yellow', fontWeight: '500' } : { color: 'red', fontWeight: '500' }}>{submission.type}</span>
                        </p>
                        <p style={{ fontSize: '14px', margin: '4px 0' }}>
                            <span style={submission.status === "Accepted" ? { color: 'green', fontWeight: 'bold' } : { color: 'red', fontWeight: 'bold' }}>{submission.status}</span>
                        </p>
                        <p>Contest-Id : {submission.contest}</p>
                    </div>
                    )}
                </div>
                <div style={{height: "500px",overflow: "scroll"}} className="submissions-section">
                    <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Contest Submissions</h1>
                    {contestSubmissions.map(submission => <div key={submission.id + 100 + Math.random() * 100000}
                        style={{
                            padding: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            backgroundColor: '#fff',
                            width: '500px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            margin: '10px',
                        }}
                    >
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                            {submission.title}
                        </h2>
                        <p style={{ fontSize: '14px', margin: '4px 0' }}>
                            <span style={submission.type === "Easy" ? { color: 'green', fontWeight: '500' } : submission.type === "Medium" ? { color: 'yellow', fontWeight: '500' } : { color: 'red', fontWeight: '500' }}>{submission.type}</span>
                        </p>
                        <p style={{ fontSize: '14px', margin: '4px 0' }}>
                            <span style={submission.status === "Accepted" ? { color: 'green', fontWeight: 'bold' } : { color: 'red', fontWeight: 'bold' }}>{submission.status}</span>
                        </p>
                        <p>Contest-Id :{submission.contest}</p>
                    </div>
                    )}
                </div>
            </div>



        </div>
    )
}

export default page
"use client"
import React, { useEffect, useState } from 'react'
import { Contest } from '../../../utils/types';
import Link from 'next/link';

const page = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  useEffect(()=>{
    (async()=>{
      const response = await fetch("api/contest");
      const data = await response.json();
      console.log(data); 
      setContests(data);
    })();
  },[]);
  return (
    <div style={{height: "92%"}}>
      {contests.map( contest => <Link key={contest.id} href={`/contests/${contest.id}`}><div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{contest.namen}</h2>
      <div className="text-gray-600 text-sm">
        <p><span className="font-medium">Start:</span> {new Date(contest.starts).toUTCString()}</p>
        <p><span className="font-medium">End:</span> {new Date(contest.ends).toUTCString()}</p>
      </div>
    </div></Link>)}
    </div>
  )
}

export default page
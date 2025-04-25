"use client"
import { usePathname ,useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Problem } from '../../../../utils/types';
import ProblemCard from '../../../../components/ProblemCard';

const page = () => {
    const pathname = usePathname();
    console.log(pathname.split("/")[2]);
    const [problems,setProblems] = useState<Problem[]>([]);
    useEffect(()=>{
        async function fetchData(){
            const response = await fetch(`/api/problems/${pathname.split("/")[2]}`);
            const data = await response.json();
            console.log(data);
            setProblems(data);
        }
        fetchData();
    },[]);
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
        }}>
            {/* @ts-ignore */}
            <h1 style={{fontSize: "24px", padding: "20px 2px 2px 40px",fontWeight: "bold"}}>{pathname.split("/")[2] ? decodeURI(pathname.split("/")[2]):" "}</h1>
            {problems.map(problem => <div key={problem.id.toString()}><ProblemCard title={problem.title} type={problem.type}/></div>)}
        </div>
    )
}

export default page
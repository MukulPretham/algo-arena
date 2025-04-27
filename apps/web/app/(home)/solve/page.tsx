"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { Problem, TestCase } from '../../../utils/types';
import { useSearchParams } from 'next/navigation';
import Description from '../../../components/Description';
import FallBack from '../../../components/FallBack';
import Code from '../../../components/Code';
// import Description from '../../../components/Description';
// import { Problem, TestCase } from '../../../utils/types';

const page = () => {
  const pathname = useSearchParams();

  const [problem, setProblem] = useState<Problem>();

  const [TestCases, setTestCases] = useState<TestCase[]>([]);

  useEffect(() => {
    async function fetchProblem() {
      const response = await fetch(`http://localhost:3000/api/getProblem/${pathname.get("id")}`);
      const data: Problem = await response.json();

      setProblem(data);
    }
    async function fetchTestCases() {
      const response = await fetch(`http://localhost:3000/api/getTestCases/${pathname.get("id")}`);
      const data: TestCase[] = await response.json();

      setTestCases(data);
    }
    fetchProblem();
    fetchTestCases();
  }, []);

  return (
    <div style={{
      display: "flex"
    }}>
      <Suspense fallback={<>Loading</>} >
        <Description Problem={problem} TestCases={TestCases} />
        <Code/>
      </Suspense>
    </div>
  )
}

export default page
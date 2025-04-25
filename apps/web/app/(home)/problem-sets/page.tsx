import React from 'react'
import { getAllProblems, getAllTopics } from '../../../utils/utils'
import { Problem, Topics } from '../../../utils/types';
import Link from 'next/link';
import ProblemCard from '../../../components/ProblemCard';

const page = async() => {

  let topics: Topics[] = await getAllTopics();
  console.log(topics);
  
  let problems = await getAllProblems();

  return (
    <div style={{
      height: "92%",
      overflow: "scroll"
    }}>
      <div style={{ display: "flex", gap: "20px", padding: "5px 5px 5px 5px", justifyContent: "center" }}>{topics.map((topic) => <Link key={topic.id.toString()} href={`/problem-sets/${topic.topicName}`}><div key={topic.id.toString()}>{topic.topicName}</div></Link>)}</div>
      {problems.map(problem => <div key={problem.id.toString()}><ProblemCard title={problem.title} type={problem.type}/></div>)}
    </div>
  )
}

export default page
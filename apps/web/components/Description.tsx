import React from 'react'
import { Problem, TestCase } from '../utils/types'

const Description = ({ Problem, TestCases }: {
    Problem?: Problem,
    TestCases: TestCase[]
}) => {
    console.log(TestCases);
    return (
        <div style={{
            height: "100vh",
            width: "50vw",
            marginLeft: "5px"
        }}>
            <div>
                <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>{Problem?.title}</h1>
                <span style={Problem?.type==="Easy"?{color:"green",margin:"5px"}:Problem?.type==="Medium"?{color:"#FFDB58",margin:"5px"}:{color: "red",margin:"5px"}}>{Problem?.type}</span>
                <p style={{margin: "30px 0px 30px 0px"}}>{Problem?.statement}</p>
            </div>
            <div style={{marginTop: "20px"}}>
                {TestCases.map((TestCase)=><div key={TestCase.id}>
                    <div>input : {TestCase.testCaseInput}</div>
                    <div>output : {TestCase.testCaseOutput}</div>
                    <div>explanation: {TestCase.explanation}</div>
                    
                </div>)}
            </div>
        </div>
    )
}

export default Description
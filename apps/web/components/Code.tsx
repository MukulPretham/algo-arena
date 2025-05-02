"use client"
import React, { useEffect, useRef, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';   // first import C
import 'prismjs/components/prism-cpp'; // then import C++
import fs from "fs";

import 'prismjs/themes/prism.css';
import { useSearchParams } from 'next/navigation';
import { verify } from '../utils/utils';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';



const Code = () => {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  const [result,setResult] = useState<string | null>("");
  const [tokens,setTokens] = useState<string[] | null>();

  const [submissionId,setSubmissionId] = useState<string | null>(null);

  const params = useSearchParams();
  const session = useSession();
  

  const langRef = useRef<HTMLSelectElement>(null);
  const selectedLanguage = langRef.current?.value || "javascript"; // fallback to 'javascript'
  const languageGrammar = languages[selectedLanguage];


  useEffect(()=>{
    if(!submissionId){
      console.log("polling")
      return;
    }
    const interval = setInterval(()=>{
      (async()=>{
        const response = await fetch(`/api/check`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            submissionId: submissionId,
            tokens: tokens
          })
        });
        const result = await response.json();
        setResult(result?.STATUS);
        if(result?.STATUS === "Accepted" || result?.STATUS === "Wrong Answer" ){
          clearInterval(interval);
        }
      })();
      
    },1000);
  },[submissionId,tokens])

  const submitHandler = async () => {
    setResult("");
    const problemId = params.get("id");
    const userId = session.data?.user?.name
    console.log(userId);
    const submitResponse = await fetch(`/api/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        problemId: problemId,
        username: userId,
        payload: {
          "source_code": `${code}`,
          "language_id": `${langRef.current?.value == "javascript" ? 63 : langRef.current?.value === "Java" ? 91 : langRef.current?.value === "C++" ? 76 : 0}`,
        }
      })

    });
    const message = await submitResponse.json();
    setSubmissionId(message?.id);
    setTokens(message?.tokens);
    console.log(message);
  };

  return (
    <div style={{
      width: "50%"
    }}>
      <select ref={langRef} name="" id="">
        <option value="Java">Java</option>
        <option value="C++">C++</option>
      </select>
      <Editor
        value={code}
        onValueChange={(newCode) => setCode(newCode)}
        highlight={(code) => {
          if (languages.js) {
            //@ts-ignore
            return highlight(code, langRef.current?.value === "javascript"||"Java"||"C++" ? languages.js : languages[selectedLanguage], `${langRef.current?.value}`);
          }
          return code; // Return the code without highlighting if languages.js is undefined
        }}
        padding={10}
        style={{
          backgroundColor: "white",

          fontFamily: '"Fira code", "Fira Mono", monospace',
          marginTop: "4px",
          marginRight: "4px",
          fontSize: 15,
          height: "60vh",
          overflow: "scroll",
          border: "2px solid black",
          borderRadius: "12px"
        }}
      />
      <div>
        <button
          onClick={submitHandler}
          style={{
            backgroundColor: "#4fbf31",
            color: "white",
            padding: "10px 10px",
            borderRadius: "14px",
            cursor: "pointer",
            position: "sticky",
            border: "2px solid black",
            marginTop: "1px",
            right: "5px"
          }}>Submit</button>
          <div>Result: {result} </div>
      </div>
    </div>

  );
};

export default Code;

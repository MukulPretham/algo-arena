"use client"
import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/themes/prism.css';

const Code = () => {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  return (
    <div style={{
      width: "50%"
    }}>
      <Editor
        value={code}
        onValueChange={(newCode) => setCode(newCode)}
        highlight={(code) => {
          if (languages.js) {
            return highlight(code, languages.js,'javascript');
          }
          return code; // Return the code without highlighting if languages.js is undefined
        }}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 15,
          height: "60vh",
          overflow: "scroll",
          border: "2px solid black",
          borderRadius: "12px"
        }}
      />
      <div>
        <button
        onClick={()=>{
          console.log(code);
        }}
         style={{
          backgroundColor: "green",
          color: "white",
          padding: "7px",
          borderRadius: "14px",
          cursor: "pointer",
          position: "fixed",
          marginTop:"12px",
          right: "5px"
        }}>Submit</button>
      </div>
    </div>

  );
};

export default Code;

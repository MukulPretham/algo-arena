"use client"
import React, { useRef } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';   // first import C
import 'prismjs/components/prism-cpp'; // then import C++

import 'prismjs/themes/prism.css';

const Code = () => {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  const langRef = useRef<HTMLSelectElement>(null);
  const selectedLanguage = langRef.current?.value || "javascript"; // fallback to 'javascript'
  const languageGrammar = languages[selectedLanguage];

  return (
    <div style={{
      width: "50%"
    }}>
      <select ref={langRef} name="" id="">
        <option value="javascript">Javascript</option>
        <option value="Java">Java</option>
        <option value="C++">C++</option>
      </select>
      <Editor
        value={code}
        onValueChange={(newCode) => setCode(newCode)}
        highlight={(code) => {
          if (languages.js) {
            //@ts-ignore
            return highlight(code, langRef.current?.value === "javascript" ? languages.js : languages[selectedLanguage], `${langRef.current?.value}`);
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
          onClick={() => {
            console.log(langRef.current?.value);
          }}
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
      </div>
    </div>

  );
};

export default Code;

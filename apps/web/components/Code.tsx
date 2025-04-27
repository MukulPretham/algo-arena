import React from 'react'


const Code = () => {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  return (
    <div style={{
      width: "50%",
      height: "100%",
      border: "2px solid black"
    }}>
      
    </div>
  )
}

export default Code
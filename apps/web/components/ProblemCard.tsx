import React from 'react'

const ProblemCard = ({title, type}:{
    title: string,
    type: string
}) => {
    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        padding: '30px',
        maxWidth: '300px',
        fontFamily: 'sans-serif',
    
      };
    
      const titleStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
      };
    
      const EasyTypeStyle = {
        fontSize: '14px',
        color: 'green',
        marginTop: '4px',
        cursor: "pointer"
      };

      const MediumTypeStyle = {
        fontSize: '14px',
        color: '#FFDB58',
        marginTop: '4px',
        cursor: "pointer"
      };

      const HardTypeStyle = {
        fontSize: '14px',
        color: 'red',
        marginTop: '4px',
        cursor: "pointer"
      };
    
      const attributeStyle = {
        marginTop: '10px',
        fontSize: '15px',
        color: '#444',
      };
    
      return (
        <div style={cardStyle}>
          <h2 style={titleStyle}>{title}</h2>
          <p style={type === "Easy"? EasyTypeStyle: type === "Medium"? MediumTypeStyle : HardTypeStyle}>{type}</p>
          
        </div>
      );
}

export default ProblemCard
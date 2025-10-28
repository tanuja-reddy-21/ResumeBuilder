import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const Resume = ({ resumeData }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'My_Resume',
  });

  return (
    <div>
      <div ref={componentRef} style={{ padding: '20px', backgroundColor: '#fff' }}>
        {/* Render your resume fields here */}
        <h1>{resumeData.basics.name}</h1>
        <p>{resumeData.basics.email}</p>
        {/* Add other resume sections like work experience, education, skills */}
      </div>
      <button onClick={handlePrint} style={{ marginTop: '10px' }}>
        Download Resume as PDF
      </button>
    </div>
  );
};

export default Resume;

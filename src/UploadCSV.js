import React, { useState } from 'react';
import Papa from 'papaparse';
import './UploadCSV.css'

function UploadCSV({ onFileUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        console.log(csvData)

        Papa.parse(csvData, {
          header: true, 
          skipEmptyLines: true,
          complete: (results) => {
            onFileUpload(results.data);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          },
        });
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className='container'>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
}

export default UploadCSV;

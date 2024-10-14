import React, { useState } from 'react';
import './ExportForm.css'

function ExportForm({ filteredData }) {
  const [exportName, setExportName] = useState('');

  const handleExportChange = (event) => {
    setExportName(event.target.value);
  };

  const handleExportSubmit = async (event) => {
    event.preventDefault();
    console.log(filteredData)

    // Send the filtered data to the backend for analysis
    try {
      const response = await fetch('http://localhost:3000/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ exportName, data: filteredData }),
      });
      console.log(response)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Data exported successfully:', data);
      alert('Data exported successfully!');
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error exporting data. Please try again.');
    }
  };

  return (
    <form onSubmit={handleExportSubmit}>
      <div>
        <label htmlFor="exportName">Export Name:</label>
        <input
          type="text"
          id="exportName"
          value={exportName}
          onChange={handleExportChange}
          required
        />
      </div>
      <button type="submit">Submit Filtered Data</button>
    </form>
  );
}

export default ExportForm;

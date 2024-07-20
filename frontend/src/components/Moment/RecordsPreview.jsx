import React, { useState, useEffect } from 'react';

function RecordsPreview() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Determine the base URL based on the environment
    const baseURL = process.env.NODE_ENV === 'development' 
                    ? 'http://localhost:32102' 
                    : 'http://www.druggableprotein.com:32102';
    console.log('Request URL:', baseURL); 
    // Fetch records when the component mounts
    fetch(`${baseURL}/record/records`)
      .then(response => response.json())
      .then(data => setRecords(data))
      .catch(error => console.error('Error fetching records:', error));
  }, []); // The empty array makes sure this effect runs only once after the initial render

  return (
    <div>
      <h2>Records Preview</h2>
      <ul>
        {records.map(record => (
          <li key={record.id}>Data: {record.data}, Time: {record.time}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecordsPreview;
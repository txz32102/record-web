import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReadmeRenderer = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const url = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:32102/files' 
        : 'http://www.druggableprotein.com:32102/files';
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:32102";
        // const url = 'http://www.druggableprotein.com:32102';
        const response = await axios.get(url);
        console.log(url);
        console.log(response.data.files)
        if (Array.isArray(response.data.files)) {
          setFiles(response.data.files);
          console.log(response.data.files)
        } else {
          throw new Error("API response is not an array");
        }
      } catch (error) {
        console.error("Error fetching files:", error);
        setError(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>hello world</p>
      {error ? (
        <div>Error: {error.message}</div>
      ) : (
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <Link to={`/readme/${file}`}>{file}</Link>            
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReadmeRenderer;

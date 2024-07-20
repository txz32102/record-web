import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReadmeList = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.NODE_ENV === 'development' 
          ? 'http://localhost:32102/list-all-files-and-folders?folder_path=/home/musong/Documents/record-web/backend/md' 
          : 'http://www.druggableprotein.com:32102/list-files?folder_path=/home/musong/Documents/record-web/backend/md&limit=1000';
        const response = await axios.get(url);
        if (response.data.items && Array.isArray(response.data.items)) {
          setFiles(response.data.items);
        } else {
          throw new Error("API response is not an array");
        }
      } catch (error) {
        console.error("Error fetching files:", error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error ? (
        <div>Error: {error.message}</div>
      ) : (
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <Link to={`/readme/${encodeURIComponent(file.name)}`}>{file.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReadmeList;

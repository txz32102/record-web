import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ReadmeList = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const { folderPathParam } = useParams();
  const baseFolderPath = process.env.NODE_ENV === 'development' 
    ? '/home/musong/Documents/record-web/backend/md' 
    : '/root/home/record-web/backend/md';

  const folderPath = folderPathParam ? `${baseFolderPath}/${folderPathParam}` : baseFolderPath;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const devUrl = 'http://localhost:32102';
      const prodUrl = 'http://www.druggableprotein.com:32102';
      const baseUrl = process.env.NODE_ENV === 'development' ? devUrl : prodUrl;
      const endpoint = '/file/list-files-and-folders';
      const url = `${baseUrl}${endpoint}?folder_path=${folderPath}`;
      console.log(url)
      try {
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
  }, [folderPath]);

  const handleItemClick = (item) => {
    if (item.type === 'folder') {
      navigate(`/readme/${encodeURIComponent(item.name.replace(baseFolderPath + '/', ''))}`);
    } else {
      navigate(`/file/${encodeURIComponent(item.name)}`);
    }
  };

  return (
    <div>
      {error ? (
        <div>Error: {error.message}</div>
      ) : (
        <ul>
          {files.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(item)}>
              <Link to="#" style={{ fontWeight: item.type === 'folder' ? 'bold' : 'normal' }}>
                {item.name.replace(baseFolderPath + '/', '')}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReadmeList;

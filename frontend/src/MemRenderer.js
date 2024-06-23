// MemeRenderer.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MemeRenderer = () => {
  const [memeData, setMemeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeme = async () => {
      try {
        const response = await axios.get('http://localhost:8000/path/to/sample.redmeme');
        setMemeData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeme();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{memeData.title}</h1>
      <img src={memeData.imageUrl} alt={memeData.title} />
      <p>{memeData.description}</p>
    </div>
  );
};

export default MemeRenderer;

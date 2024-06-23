import React, { useState, useEffect } from 'react';

const ReadmeRenderer = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch the README content from your Python server
    fetch('/api/readme')
      .then(response => response.text())
      .then(data => setContent(data));
  }, []);

  return (
    <div className="readme-renderer">
      <pre>{content}</pre>
    </div>
  );
};

export default ReadmeRenderer;

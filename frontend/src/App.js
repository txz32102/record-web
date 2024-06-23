import React from 'react';
import InputArea from './InputArea'; // Adjust the path as necessary
import RecordsPreview from './RecordsPreview';


function App() {
  return (
      <div className="App">
        <header className="App-header">
          <p>Enter your text below:</p>
          <InputArea />
          <RecordsPreview />
        </header>
      </div>
  );
}

export default App;

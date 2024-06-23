import React from 'react';
import InputArea from './InputArea';
import RecordsPreview from './RecordsPreview';

const Moment = () => {

return (
  <div className="App">
    <header className="App-header">
      <p>Enter your text below:</p>
      <InputArea />
      <RecordsPreview />
    </header>
  </div>
);
};

export default Moment;
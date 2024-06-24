// Moment.js
import React from 'react';
import InputArea from './InputArea';
import RecordsPreview from './RecordsPreview';

const Moment = () => {
  return (
    <div>
        <p>Enter your text below:</p>
        <InputArea />
        <RecordsPreview />
    </div>
  );
};

export default Moment;

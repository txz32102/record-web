import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import View from './BaseView/View';
import Moment from './Moment/Moment';
import ReadmeList from './ReadmeRenderer/ReadmeList';
import ReadmeViewer from './ReadmeRenderer/ReadmeViewer';

const App = () => {
  return (
    <Router>
      <div className="app">
        <View />
        <Routes>
          <Route path="/" element={<Moment />} />
          <Route path="/readme" element={<ReadmeList />} />
          <Route path="/readme/:folderPathParam/*" element={<ReadmeList />} />
          <Route path="/file/:filename" element={<ReadmeViewer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

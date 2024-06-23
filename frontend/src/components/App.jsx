import React, { useState, useContext } from 'react';
import MenuBar from './MenuBar/MenuBar';
import SettingsIcon from './SettingsIcon/SettingsIcon';
import Moment from './Moment/Moment';
import ReadmeRenderer from './ReadmeRenderer/ReadmeRenderer';
import { SettingsContext } from '../context/SettingsContext';
import './App.css';

const App = () => {
  const { isMenuVisible, defaultView } = useContext(SettingsContext);
  const [view, setView] = useState(defaultView);

  return (
    <div className="app">
      <SettingsIcon setView={setView} />
      {isMenuVisible && <MenuBar setView={setView} />}
      <div className="view-container">
        {view === 'moment' && <Moment />}
        {view === 'readme' && <ReadmeRenderer />}
      </div>
    </div>
  );
};

export default App;

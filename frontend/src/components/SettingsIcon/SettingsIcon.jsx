import React, { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';

const SettingsIcon = ({ setView }) => {
  const { toggleMenuVisibility, isMenuVisible, setDefaultView } = useContext(SettingsContext);

  return (
    <div className="settings-icon">
      <button onClick={toggleMenuVisibility}>
        {isMenuVisible ? 'Hide Menu' : 'Show Menu'}
      </button>
      <div>
        <label>Default View:</label>
        <select onChange={(e) => setDefaultView(e.target.value)}>
          <option value="moment">Moment</option>
          <option value="readme">Readme Renderer</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsIcon;

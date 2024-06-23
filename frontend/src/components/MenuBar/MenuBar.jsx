import React from 'react';

const MenuBar = ({ setView }) => {
  return (
    <div className="menu-bar">
      <button onClick={() => setView('moment')}>Moment</button>
      <button onClick={() => setView('readme')}>Readme Renderer</button>
    </div>
  );
};

export default MenuBar;

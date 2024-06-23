import React, { createContext, useState } from 'react';

export const SettingsContext = createContext();

const Config = {
  DefaultAppView: 'moment',
  isMenuVisible: true,
};

export const SettingsProvider = ({ children, config = Config }) => {
  const [isMenuVisible, setMenuVisible] = useState(config.isMenuVisible);
  const [defaultView, setDefaultView] = useState(config.DefaultAppView);

  const toggleMenuVisibility = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <SettingsContext.Provider value={{ isMenuVisible, defaultView, toggleMenuVisibility, setDefaultView }}>
      {children}
    </SettingsContext.Provider>
  );
};


/*
I want to write a config data struct, it have the DefalutAppView, settingsprovider take this config struct as an argument, rewrite this component
*/
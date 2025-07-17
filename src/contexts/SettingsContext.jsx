import React, { createContext, useState, useMemo } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [units, setUnits] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  const settings = useMemo(() => ({
    units,
    theme,
    setUnits,
    setTheme,
  }), [units, theme]);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};
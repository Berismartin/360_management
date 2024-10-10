// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : true; // false for light mode, true for dark mode
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

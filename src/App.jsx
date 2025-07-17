import React, { useContext, useEffect } from 'react';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AlertsProvider } from './contexts/AlertsContext';
import { ReportsProvider } from './contexts/ReportsContext';
import HomePage from './pages/HomePage';
import { SettingsContext } from './contexts/SettingsContext';

function App() {
  const { theme } = useContext(SettingsContext);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
  }, [theme]);

  return (
    <FavoritesProvider>
      <AlertsProvider>
        <ReportsProvider>
          <HashRouter>
            <Routes>
              <Route path="/*" element={<HomePage />} />
            </Routes>
          </HashRouter>
        </ReportsProvider>
      </AlertsProvider>
    </FavoritesProvider>
  );
}

export default App

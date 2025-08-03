import React, { useContext, useEffect } from 'react';
import './App.css';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AlertsProvider } from './contexts/AlertsContext';
import { ReportsProvider } from './contexts/ReportsContext';
import { OutfitProvider } from './contexts/OutfitContext';
import HomePage from './pages/HomePage';
import OverviewPage from './pages/OverviewPage';
import OOTDPage from './pages/OOTDPage';
import AlertsPage from './pages/AlertsPage';
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
          <OutfitProvider>
            <HashRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/overview" element={<OverviewPage />} />
                <Route path="/ootd" element={<OOTDPage />} />
                <Route path="/alerts" element={<AlertsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </HashRouter>
          </OutfitProvider>
        </ReportsProvider>
      </AlertsProvider>
    </FavoritesProvider>
  );
}

export default App;

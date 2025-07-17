import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom';
import { WeatherProvider } from './contexts/WeatherContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AlertsProvider } from './contexts/AlertsContext';
import { ReportsProvider } from './contexts/ReportsContext';
import HomePage from './pages/HomePage';

function App() {
  return (
    <WeatherProvider>
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
    </WeatherProvider>
  );
}

export default App

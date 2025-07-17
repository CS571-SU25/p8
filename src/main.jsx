import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { SettingsProvider } from './contexts/SettingsContext';
import { WeatherProvider } from './contexts/WeatherContext';

createRoot(document.getElementById('root')).render(
  <SettingsProvider>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </SettingsProvider>
);

import { useEffect, useContext } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';
import { AlertsContext } from '../contexts/AlertsContext';

// This component monitors weather changes and triggers alerts
function WeatherMonitor() {
  const { current, locationName } = useContext(WeatherContext);
  const { checkAlerts } = useContext(AlertsContext);

  useEffect(() => {
    // Check alerts whenever weather data changes
    if (current && locationName) {
      const currentWeather = {
        temp: current.temp,
        description: current.description,
        windSpeed: current.wind || 0,
        humidity: current.humidity || 0,
        pressure: current.pressure || 0,
        uvi: current.uv || 0,
        location: locationName
      };

      console.log('WeatherMonitor: Checking alerts with weather:', currentWeather);
      // Check alerts against current weather
      checkAlerts(currentWeather);
    }
  }, [current, locationName, checkAlerts]);

  // This component doesn't render anything
  return null;
}

export default WeatherMonitor;
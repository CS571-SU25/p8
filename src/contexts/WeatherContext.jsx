import React, { createContext, useState, useCallback, useContext } from 'react';
import { SettingsContext } from './SettingsContext';
import { getWeatherDescription } from '../utils/weatherUtils';
import { API_BASE_URLS } from '../config';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationName, setLocationName] = useState('');
  const { units } = useContext(SettingsContext);

  const fetchGeocoding = async (location) => {
    const geocodingUrl = `${API_BASE_URLS.geocoding}?name=${location}&count=1&language=en&format=json`;
    const geocodingResponse = await fetch(geocodingUrl);
    if (!geocodingResponse.ok) {
      throw new Error('Geocoding data could not be fetched.');
    }
    const geocodingData = await geocodingResponse.json();
    if (!geocodingData.results || geocodingData.results.length === 0) {
      throw new Error('Location not found.');
    }
    return geocodingData.results[0];
  };

  const fetchWeatherData = async (latitude, longitude) => {
    const tempUnit = units === 'metric' ? 'celsius' : 'fahrenheit';
    const url = `${API_BASE_URLS.forecast}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,surface_pressure&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&temperature_unit=${tempUnit}&timezone=auto&forecast_days=7`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Weather data could not be fetched.');
    }
    return response.json();
  };

  const fetchWeather = useCallback(async (location) => {
    setLoading(true);
    setError(null);
    try {
      const { latitude, longitude, name } = await fetchGeocoding(location);
      setLocationName(name);
      const data = await fetchWeatherData(latitude, longitude);

      setCurrent({
        temp: Math.round(data.current.temperature_2m),
        description: getWeatherDescription(data.current.weather_code),
        feelsLike: Math.round(data.current.apparent_temperature),
        uv: Math.round(data.daily.uv_index_max[0]),
        humidity: Math.round(data.current.relative_humidity_2m),
        wind: Math.round(data.current.wind_speed_10m),

        pressure: Math.round(data.current.surface_pressure / 100), // Convert to hPa
        sunrise: new Date(data.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sunset: new Date(data.daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });

      setForecast(
        data.daily.time.slice(1, 6).map((time, index) => ({
          date: time,
          day: {
            maxtemp_c: Math.round(data.daily.temperature_2m_max[index + 1]),
            mintemp_c: Math.round(data.daily.temperature_2m_min[index + 1]),
            daily_chance_of_rain: 10, // Placeholder
            condition: { text: getWeatherDescription(data.daily.weather_code[index + 1]) },
          },
        }))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [units]);

  return (
    <WeatherContext.Provider value={{ current, forecast, loading, error, fetchWeather, locationName }}>
      {children}
    </WeatherContext.Provider>
  );
};
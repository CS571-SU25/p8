import React, { createContext, useState, useCallback } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (location) => {
    setLoading(true);
    setError(null);
    try {
      // A real app would use a geocoding service to convert location names to coordinates.
      const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`;
      const geocodingResponse = await fetch(geocodingUrl);
      if (!geocodingResponse.ok) {
        throw new Error('Geocoding data could not be fetched.');
      }
      const geocodingData = await geocodingResponse.json();
      if (!geocodingData.results || geocodingData.results.length === 0) {
        throw new Error('Location not found.');
      }
      const { latitude, longitude } = geocodingData.results[0];

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,surface_pressure&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=7`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Weather data could not be fetched.');
      }
      const data = await response.json();

      setCurrent({
        temp: Math.round(data.current.temperature_2m),
        description: 'Sunny', // Placeholder, will need a mapping from weather_code
        feelsLike: Math.round(data.current.apparent_temperature),
        uv: Math.round(data.daily.uv_index_max[0]),
        humidity: Math.round(data.current.relative_humidity_2m),
        wind: Math.round(data.current.wind_speed_10m),
        visibility: 10, // Not directly available in this API response
        pressure: Math.round(data.current.surface_pressure / 100), // Convert to hPa
        sunrise: new Date(data.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sunset: new Date(data.daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });

      setForecast(
        data.daily.time.slice(1, 6).map((time, index) => ({
          day: new Date(time).toLocaleDateString('en-US', { weekday: 'short' }),
          temp: Math.round((data.daily.temperature_2m_max[index + 1] + data.daily.temperature_2m_min[index + 1]) / 2),
        }))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <WeatherContext.Provider value={{ current, forecast, loading, error, fetchWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};
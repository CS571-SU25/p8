import React, { useContext } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { ExclamationTriangle, ArrowClockwise } from 'react-bootstrap-icons';
import { WeatherContext } from '../contexts/WeatherContext';
import { SettingsContext } from '../contexts/SettingsContext';

function ErrorAlert() {
  const { error, fetchWeather, locationName } = useContext(WeatherContext);
  const { theme } = useContext(SettingsContext);

  if (!error) return null;

  const handleRetry = () => {
    if (locationName) {
      fetchWeather(locationName);
    }
  };

  const getErrorMessage = (error) => {
    if (error.includes('Location not found')) {
      return 'City not found. Please check if the city name is correct.';
    }
    if (error.includes('could not be fetched')) {
      return 'Network connection failed. Please check your network connection and try again.';
    }
    return 'An error occurred while fetching weather information. Please try again later.';
  };

  const alertClass = theme === 'dark' ? 'bg-danger text-light' : 'bg-danger text-white';

  return (
    <Alert variant="danger" className={`mb-3 ${alertClass}`}>
      <div className="d-flex align-items-center">
        <ExclamationTriangle className="me-2" />
        <div className="flex-grow-1">
          <Alert.Heading>Error!</Alert.Heading>
          <p className="mb-2">{getErrorMessage(error)}</p>
          {locationName && (
            <Button 
              variant="outline-light" 
              size="sm" 
              onClick={handleRetry}
              className="d-flex align-items-center"
            >
              <ArrowClockwise className="me-1" />
              Retry
            </Button>
          )}
        </div>
      </div>
    </Alert>
  );
}

export default ErrorAlert;
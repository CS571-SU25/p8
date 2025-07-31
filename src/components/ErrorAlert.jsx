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
      return '找不到该城市，请检查城市名称是否正确。';
    }
    if (error.includes('could not be fetched')) {
      return '网络连接失败，请检查网络连接后重试。';
    }
    return '获取天气信息时出现错误，请稍后重试。';
  };

  const alertClass = theme === 'dark' ? 'bg-danger text-light' : 'bg-danger text-white';

  return (
    <Alert variant="danger" className={`mb-3 ${alertClass}`}>
      <div className="d-flex align-items-center">
        <ExclamationTriangle className="me-2" />
        <div className="flex-grow-1">
          <Alert.Heading>出错了！</Alert.Heading>
          <p className="mb-2">{getErrorMessage(error)}</p>
          {locationName && (
            <Button 
              variant="outline-light" 
              size="sm" 
              onClick={handleRetry}
              className="d-flex align-items-center"
            >
              <ArrowClockwise className="me-1" />
              重试
            </Button>
          )}
        </div>
      </div>
    </Alert>
  );
}

export default ErrorAlert; 
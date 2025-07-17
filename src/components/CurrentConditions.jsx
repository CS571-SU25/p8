import React, { useContext } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { WeatherContext } from '../contexts/WeatherContext';
import { SettingsContext } from '../contexts/SettingsContext';
import DetailTile from './DetailTile';
import { Droplet, Wind, Eye, Speedometer, Sunrise, Sunset } from 'react-bootstrap-icons';

function CurrentConditions() {
  const { current, locationName } = useContext(WeatherContext);
  const { theme } = useContext(SettingsContext);

  const getWeatherBackground = () => {
    if (!current || !current.description) return 'rgba(0, 0, 0, 0.3)';
    const desc = current.description.toLowerCase();
    if (theme === 'dark') {
      if (desc.includes('sun') || desc.includes('clear')) return 'linear-gradient(to right, #0f2027, #203a43, #2c5364)';
      if (desc.includes('cloud')) return 'linear-gradient(to right, #3c4a52, #6b7c86)';
      if (desc.includes('rain')) return 'linear-gradient(to right, #28313b, #485461)';
      if (desc.includes('snow')) return 'linear-gradient(to right, #3e5151, #decba4)';
      if (desc.includes('storm')) return 'linear-gradient(to right, #000000, #434343)';
    } else {
      if (desc.includes('sun') || desc.includes('clear')) return 'linear-gradient(to right, #4facfe, #00f2fe)';
      if (desc.includes('cloud')) return 'linear-gradient(to right, #cfd9df, #e2ebf0)';
      if (desc.includes('rain')) return 'linear-gradient(to right, #6a85b6, #bac8e0)';
      if (desc.includes('snow')) return 'linear-gradient(to right, #e6dada, #274046)';
      if (desc.includes('storm')) return 'linear-gradient(to right, #2c3e50, #4ca1af)';
    }
    return 'rgba(0, 0, 0, 0.3)';
  };

  if (!current) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="mb-4 text-white" style={{ background: getWeatherBackground() }}>
      <Card.Body>
        <Row>
          <Col md={6}>
            <h2>{locationName || 'New York'}</h2>
            <div className="d-flex align-items-center">
              <i className="bi bi-cloud-rain fs-1"></i>
              <div className="ms-3">
                <div className="display-4">{current.temp}°</div>
                <div>{current.description}</div>
              </div>
            </div>
          </Col>
          <Col md={6} className="text-end">
            <div>Thursday, July 17, 2025</div>
            <div>Feels like {current.feelsLike}°</div>
            <div>UV Index: {current.uv}</div>
          </Col>
        </Row>
        <hr />
        <Row className="text-center">
          <Col><DetailTile icon={<Droplet />} label="Humidity" value={`${current.humidity}%`} /></Col>
          <Col><DetailTile icon={<Wind />} label="Wind" value={`${current.wind} km/h`} /></Col>

          <Col><DetailTile icon={<Speedometer />} label="Pressure" value={`${current.pressure} hPa`} /></Col>
        </Row>
        <div className="d-flex justify-content-between mt-3">
            <span><Sunrise /> {current.sunrise}</span>
            <span><Sunset /> {current.sunset}</span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CurrentConditions;
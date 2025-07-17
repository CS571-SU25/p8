import React, { useContext } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { WeatherContext } from '../contexts/WeatherContext';
import DetailTile from './DetailTile';
import { Droplet, Wind, Eye, Speedometer, Sunrise, Sunset } from 'react-bootstrap-icons';

function CurrentConditions() {
  const { current } = useContext(WeatherContext);

  if (!current) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="mb-4 text-white" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
      <Card.Body>
        <Row>
          <Col md={6}>
            <h2>New York</h2>
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
          <Col><DetailTile icon={<Eye />} label="Visibility" value={`${current.visibility} km`} /></Col>
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
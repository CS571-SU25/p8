import React, { useContext, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { WeatherContext } from '../contexts/WeatherContext';

function ForecastCarousel() {
  const { forecast } = useContext(WeatherContext);
  const [selectedDay, setSelectedDay] = useState(null);

  if (!forecast) {
    return null;
  }

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>5-Day Forecast</h5>
          <div>
            <Button variant="light" size="sm" className="me-2">&lt;</Button>
            <Button variant="light" size="sm">&gt;</Button>
          </div>
        </div>
        <Row>
          {forecast.map((day, index) => (
            <Col key={index} onClick={() => handleDayClick(day)} style={{ cursor: 'pointer' }}>
              <Card className={`text-center ${selectedDay === day ? 'border-primary' : ''}`}>
                <Card.Body>
                  <div>{day.day}</div>
                  <i className="bi bi-cloud-sun fs-2 my-2"></i>
                  <div><strong>{day.temp}°</strong></div>
                  <div>10%</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {selectedDay && (
          <div className="mt-3">
            <h6>Today Details</h6>
            <Row>
              <Col>High: {selectedDay.temp}°</Col>
              <Col>Low: 5°</Col>
              <Col>Precipitation: 29%</Col>
              <Col>Condition: Cloudy</Col>
            </Row>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default ForecastCarousel;
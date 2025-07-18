import React, { useContext, useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { WeatherContext } from '../contexts/WeatherContext';

function ForecastCarousel() {
  const { forecast } = useContext(WeatherContext);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (forecast && forecast.length > 0) {
      setSelectedIndex(0);
    }
  }, [forecast]);

  if (!forecast || forecast.length === 0) {
    return null;
  }

  const handleDayClick = (index) => {
    setSelectedIndex(index);
  };

  const handlePrev = () => {
    setSelectedIndex((prevIndex) => (prevIndex === 0 ? forecast.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex === forecast.length - 1 ? 0 : prevIndex + 1));
  };

  const selectedDay = forecast[selectedIndex];

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>5-Day Forecast</h5>
          <div>
            <Button variant="light" size="sm" className="me-2" onClick={handlePrev}>&lt;</Button>
            <Button variant="light" size="sm" onClick={handleNext}>&gt;</Button>
          </div>
        </div>
        <Row>
          {forecast.map((day, index) => (
            <Col key={index} onClick={() => handleDayClick(index)} style={{ cursor: 'pointer' }}>
              <Card className={`text-center ${selectedIndex === index ? 'border-primary' : ''}`}>
                <Card.Body>
                  <div>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div><strong>{day.day.maxtemp_c}°</strong></div>
                  <div>{day.day.daily_chance_of_rain}%</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {selectedDay && (
          <div className="mt-3">
            <h6>Today Details</h6>
            <Row>
              <Col>High: {selectedDay.day.maxtemp_c}°</Col>
              <Col>Low: {selectedDay.day.mintemp_c}°</Col>
              <Col>Precipitation: {selectedDay.day.daily_chance_of_rain}%</Col>
              <Col>Condition: {selectedDay.day.condition.text}</Col>
            </Row>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default ForecastCarousel;
import React, { useState, useContext } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { WeatherContext } from '../contexts/WeatherContext';

function ForecastCarousel() {
  const { forecast } = useContext(WeatherContext);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!forecast || forecast.length === 0) {
    return <div>No forecast data available.</div>;
  }

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : forecast.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < forecast.length - 1 ? prev + 1 : 0));
  };

  const handleDayClick = (index) => {
    setSelectedIndex(index);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleDayClick(index);
    }
  };

  const selectedDay = forecast[selectedIndex];

  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h5 mb-0">5-Day Forecast</h2>
          <div role="group" aria-label="Forecast navigation">
            <Button 
              variant="light" 
              size="sm" 
              className="me-2" 
              onClick={handlePrev}
              aria-label="Previous day"
              title="View previous day"
            >
              &lt;
            </Button>
            <Button 
              variant="light" 
              size="sm" 
              onClick={handleNext}
              aria-label="Next day"
              title="View next day"
            >
              &gt;
            </Button>
          </div>
        </div>
        <Row role="listbox" aria-label="5-day weather forecast">
          {forecast.map((day, index) => (
            <Col 
              key={index} 
              onClick={() => handleDayClick(index)} 
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={{ cursor: 'pointer' }}
              role="option"
              aria-selected={selectedIndex === index}
              tabIndex={0}
              aria-label={`${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })} - High: ${day.day.maxtemp_c}°, Low: ${day.day.mintemp_c}°, Precipitation: ${day.day.daily_chance_of_rain}%`}
            >
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
          <div className="mt-3" role="region" aria-label="Selected day details">
            <h3 className="h6">Today Details</h3>
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
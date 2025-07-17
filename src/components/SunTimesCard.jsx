import React, { useContext } from 'react';
import { Card, ProgressBar, Row, Col } from 'react-bootstrap';
import { Sunrise, Sunset } from 'react-bootstrap-icons';
import { WeatherContext } from '../contexts/WeatherContext';

function SunTimesCard() {
  const { current } = useContext(WeatherContext);

  if (!current) {
    return <div>Loading...</div>;
  }

  // Mock data for progress and day length until real data is available
  const daylightProgress = 84;
  const dayLength = '12h 53m';
  const timeToSunset = 'in 2h 0m';

  return (
    <Card className="p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Sun Times</h5>
        <span className="text-muted">17:36:17</span>
      </div>
      <div className="mb-4">
        <div className="d-flex justify-content-between text-muted mb-1">
          <span>Daylight Progress</span>
          <span>{daylightProgress}%</span>
        </div>
        <ProgressBar now={daylightProgress} style={{ height: '8px' }} />
      </div>
      <Row className="mb-4">
        <Col className="text-center">
          <Card className="p-3 bg-light border-0">
            <Sunrise size={32} className="text-warning mb-2 mx-auto" />
            <h6>Sunrise</h6>
            <p className="fs-4 mb-0">{current.sunrise}</p>
            <small className="text-muted">{dayLength} ago</small>
          </Card>
        </Col>
        <Col className="text-center">
          <Card className="p-3 bg-light border-0">
            <Sunset size={32} className="text-primary mb-2 mx-auto" />
            <h6>Sunset</h6>
            <p className="fs-4 mb-0">{current.sunset}</p>
            <small className="text-muted">{timeToSunset}</small>
          </Card>
        </Col>
      </Row>
      <div className="text-center">
        <h6>Day Length</h6>
        <p className="fs-5 mb-0">{dayLength}</p>
        <small className="text-muted">Currently daytime</small>
      </div>
    </Card>
  );
}

export default SunTimesCard;
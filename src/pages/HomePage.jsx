import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ErrorAlert from '../components/ErrorAlert';
import { WeatherContext } from '../contexts/WeatherContext';

function HomePage() {
  const { fetchWeather, current, locationName } = useContext(WeatherContext);

  useEffect(() => {
    fetchWeather('New York'); // Default location
  }, [fetchWeather]);

  return (
    <div className="page-container">
      <Header />
      <Container fluid className="main-content">
        <ErrorAlert />
        <div className="text-center mb-5">
          <h1 className="display-4 mb-3">Welcome to WeatherStyle</h1>
          <p className="lead">Your reliable source for weather forecasts and information</p>
          {current && (
            <div className="alert alert-info">
              <strong>Current Weather in {locationName}:</strong> {current.temp}°C, {current.description}
            </div>
          )}
        </div>

        <Row className="g-4">
          <Col lg={4} md={6}>
            <Card className="h-100">
              <Card.Body className="text-center">
                <h3 className="card-title">Weather Overview</h3>
                <p className="card-text">Get detailed current weather conditions and 5-day forecasts for any location.</p>
                <Link to="/overview">
                  <Button variant="primary">View Overview</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6}>
            <Card className="h-100">
              <Card.Body className="text-center">
                <h3 className="card-title">Outfit of the Day</h3>
                <p className="card-text">Get personalized outfit recommendations based on current weather conditions.</p>
                <Link to="/ootd">
                  <Button variant="primary">Get Recommendations</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6}>
            <Card className="h-100">
              <Card.Body className="text-center">
                <h3 className="card-title">Weather Alerts</h3>
                <p className="card-text">Set up and manage weather alerts to stay informed about severe weather.</p>
                <Link to="/alerts">
                  <Button variant="primary">Manage Alerts</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="mt-5 text-center">
          <h2>Quick Features</h2>
          <Row className="mt-4">
            <Col md={3}>
              <div className="text-center">
                <h4>Search Cities</h4>
                <p>Search for any city worldwide to get weather information</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="text-center">
                <h4>Favorites</h4>
                <p>Save your favorite locations for quick access</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="text-center">
                <h4>Dark Mode</h4>
                <p>Switch between light and dark themes</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="text-center">
                <h4>Responsive</h4>
                <p>Works perfectly on all devices</p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default HomePage;
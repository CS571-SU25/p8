import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CloudSun, PersonCheck, Bell, Search, Heart, Moon, Phone } from 'react-bootstrap-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ErrorAlert from '../components/ErrorAlert';
import WeatherMonitor from '../components/WeatherMonitor';
import { WeatherContext } from '../contexts/WeatherContext';

function HomePage() {
  const { fetchWeather, current, locationName } = useContext(WeatherContext);

  useEffect(() => {
    fetchWeather('New York'); // Default location
  }, [fetchWeather]);

  return (
    <div className="page-container">
      <Header />
      <WeatherMonitor />
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
            <Card className="h-100 shadow-sm border-0 feature-card">
              <Card.Body className="text-center p-4">
                <div className="feature-icon mb-3">
                  <CloudSun size={48} className="text-primary" />
                </div>
                <h3 className="card-title h4 mb-3">Weather Overview</h3>
                <p className="card-text text-muted">Get detailed current weather conditions and 5-day forecasts for any location.</p>
                <Link to="/overview">
                  <Button variant="primary" className="rounded-pill px-4">View Overview</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6}>
            <Card className="h-100 shadow-sm border-0 feature-card">
              <Card.Body className="text-center p-4">
                <div className="feature-icon mb-3">
                  <PersonCheck size={48} className="text-success" />
                </div>
                <h3 className="card-title h4 mb-3">Outfit of the Day</h3>
                <p className="card-text text-muted">Get personalized outfit recommendations based on current weather conditions.</p>
                <Link to="/ootd">
                  <Button variant="success" className="rounded-pill px-4">Get Recommendations</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6}>
            <Card className="h-100 shadow-sm border-0 feature-card">
              <Card.Body className="text-center p-4">
                <div className="feature-icon mb-3">
                  <Bell size={48} className="text-warning" />
                </div>
                <h3 className="card-title h4 mb-3">Weather Alerts</h3>
                <p className="card-text text-muted">Set up and manage weather alerts to stay informed about severe weather.</p>
                <Link to="/alerts">
                  <Button variant="warning" className="rounded-pill px-4">Manage Alerts</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="mt-5 text-center">
          <h2 className="mb-4">Quick Features</h2>
          <Row className="mt-4 g-4">
            <Col md={3} sm={6}>
              <div className="text-center quick-feature">
                <div className="feature-icon-small mb-3">
                  <Search size={32} className="text-info" />
                </div>
                <h5 className="fw-semibold">Search Cities</h5>
                <p className="text-muted small">Search for any city worldwide to get weather information</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="text-center quick-feature">
                <div className="feature-icon-small mb-3">
                  <Heart size={32} className="text-danger" />
                </div>
                <h5 className="fw-semibold">Favorites</h5>
                <p className="text-muted small">Save your favorite locations for quick access</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="text-center quick-feature">
                <div className="feature-icon-small mb-3">
                  <Moon size={32} className="text-secondary" />
                </div>
                <h5 className="fw-semibold">Dark Mode</h5>
                <p className="text-muted small">Switch between light and dark themes</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="text-center quick-feature">
                <div className="feature-icon-small mb-3">
                  <Phone size={32} className="text-primary" />
                </div>
                <h5 className="fw-semibold">Responsive</h5>
                <p className="text-muted small">Works perfectly on all devices</p>
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
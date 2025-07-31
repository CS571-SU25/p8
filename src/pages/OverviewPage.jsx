import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CurrentConditions from '../components/CurrentConditions';
import ForecastCarousel from '../components/ForecastCarousel';
import ErrorAlert from '../components/ErrorAlert';
import { WeatherContext } from '../contexts/WeatherContext';

function OverviewPage() {
  const { current } = useContext(WeatherContext);

  return (
    <div className="page-container">
      <Header />
      <Container fluid className="main-content">
        <ErrorAlert />
        <h1 className="mb-4">Weather Overview</h1>
        {!current ? (
          <div className="text-center">
            <p>Loading weather information...</p>
          </div>
        ) : (
          <div>
            <CurrentConditions />
            <ForecastCarousel />
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default OverviewPage; 
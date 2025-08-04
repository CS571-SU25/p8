import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OOTDCard from '../components/OOTDCard';
import ErrorAlert from '../components/ErrorAlert';
import { WeatherContext } from '../contexts/WeatherContext';

function OOTDPage() {
  const { fetchWeather } = useContext(WeatherContext);

  useEffect(() => {
    // Load weather data if not already loaded
    fetchWeather('New York');
  }, [fetchWeather]);

  return (
    <div className="page-container">
      <Header />
      <Container fluid className="main-content">
        <ErrorAlert />
        <h1 className="mb-4 ootd-title">Outfit of the Day</h1>
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <OOTDCard />
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default OOTDPage;
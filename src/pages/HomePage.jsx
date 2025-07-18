import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import TabNav from '../components/TabNav';
import Footer from '../components/Footer';

import CurrentConditions from '../components/CurrentConditions';
import ForecastCarousel from '../components/ForecastCarousel';
import { useContext } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';

// Placeholder components for each tab
const Overview = () => {
  const { current } = useContext(WeatherContext);

  if (!current) {
    return <div>Loading...</div>;
  }

  return (
  <div>
    <CurrentConditions />
    <ForecastCarousel />
  </div>
  );
};
import OOTDCard from '../components/OOTDCard';

import viteLogo from '/vite.svg'

const OOTD = () => {
  return (
    <div>
      <OOTDCard />
    </div>
  );
};
import AlertList from '../components/AlertList';
import AlertFormModal from '../components/AlertFormModal';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

const Alerts = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={handleShowModal}>Add Alert</Button>
      </div>
      <AlertList />
      <AlertFormModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};
import SunTimesCard from '../components/SunTimesCard';

const SunTimes = () => {
  return <SunTimesCard />;
};

import { useEffect } from 'react';

function HomePage() {
  const { fetchWeather } = useContext(WeatherContext);

  useEffect(() => {
    fetchWeather('New York'); // Default location
  }, [fetchWeather]);

  return (
    <div className="page-container">
      <Header />
      <Container fluid className="main-content">
        <TabNav />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/ootd" element={<OOTD />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/suntimes" element={<SunTimes />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default HomePage;
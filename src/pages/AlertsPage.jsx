import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AlertList from '../components/AlertList';
import AlertFormModal from '../components/AlertFormModal';
import ErrorAlert from '../components/ErrorAlert';

function AlertsPage() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="page-container">
      <Header />
      <Container fluid className="main-content">
        <ErrorAlert />
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0 weather-alerts-title">Weather Alerts</h1>
          <Button variant="primary" onClick={handleShowModal}>
            Add Alert
          </Button>
        </div>
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <AlertList />
          </div>
        </div>
        <AlertFormModal show={showModal} handleClose={handleCloseModal} />
      </Container>
      <Footer />
    </div>
  );
}

export default AlertsPage;
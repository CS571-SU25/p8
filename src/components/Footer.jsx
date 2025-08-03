import React, { useState, useContext } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SettingsContext } from '../contexts/SettingsContext';

function Footer() {
  const { theme } = useContext(SettingsContext);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  
  const footerClass = theme === 'dark' 
    ? 'footer bg-dark py-5 mt-auto border-top border-secondary' 
    : 'footer bg-light py-5 mt-auto border-top border-light-subtle';
  const textClass = theme === 'dark' ? 'text-light' : 'text-dark';
  const linkClass = theme === 'dark' 
    ? 'text-light text-decoration-none hover-link-light' 
    : 'text-dark text-decoration-none hover-link-dark';
  const mutedClass = theme === 'dark' ? 'text-light-emphasis' : 'text-muted';

  return (
    <>
      <footer className={footerClass}>
        <Container>
          <Row>
            <Col md={6}>
              <h5 className={textClass}>WeatherStyle</h5>
              <p className={`${mutedClass} mb-0`}>Your reliable source for weather forecasts and outfit recommendations.</p>
            </Col>
            <Col md={3}>
              <h6 className={textClass}>Links</h6>
              <ul className="list-unstyled">
                <li>
                  <Link to="/" className={linkClass}>Home</Link>
                </li>
                <li>
                  <button 
                    className={`btn btn-link p-0 ${linkClass}`}
                    onClick={() => setShowAbout(true)}
                    style={{ textAlign: 'left' }}
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    className={`btn btn-link p-0 ${linkClass}`}
                    onClick={() => setShowContact(true)}
                    style={{ textAlign: 'left' }}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <h6 className={textClass}>Contributors</h6>
              <div className={`small ${mutedClass}`}>
                <p className="mb-1">Xin Chen</p>
                <p className="mb-1">Tim Yang</p>
                <p className="mb-1">Siyu Han</p>
              </div>
            </Col>
          </Row>
          <hr className={`my-3 ${theme === 'dark' ? 'border-secondary' : 'border-light'}`} />
          <Row>
            <Col className="text-center">
              <p className={`mb-0 small ${mutedClass}`}>
                © 2025 WeatherStyle. Developed by Xin Chen, Tim Yang, and Siyu Han at University of Wisconsin-Madison.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* About Modal */}
      <Modal show={showAbout} onHide={() => setShowAbout(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>About WeatherStyle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Welcome to WeatherStyle!</h5>
          <p>
            WeatherStyle is a comprehensive weather application that provides accurate weather forecasts 
            and personalized outfit recommendations. Our app combines real-time weather data with 
            intelligent styling suggestions to help you dress appropriately for any weather condition.
          </p>
          <h6>Features:</h6>
          <ul>
            <li>Real-time weather information for any city worldwide</li>
            <li>5-day weather forecast with detailed conditions</li>
            <li>Personalized outfit recommendations based on weather</li>
            <li>Weather alerts and notifications</li>
            <li>Favorite locations for quick access</li>
            <li>Dark and light theme support</li>
            <li>Responsive design for all devices</li>
          </ul>
          <p>
            Built with React, React Bootstrap, and modern web technologies to provide 
            a seamless and accessible user experience.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAbout(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Contact Modal */}
      <Modal show={showContact} onHide={() => setShowContact(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Get in Touch</h5>
          <p>
            We'd love to hear from you! Whether you have questions, feedback, or suggestions 
            for improving WeatherStyle, feel free to reach out.
          </p>
          <div className="contact-info">
              <h6>Development Team:</h6>
              <div className="mb-3">
                <p className="mb-1">Xin Chen</p>
                <p className="mb-1">Tim Yang</p>
                <p className="mb-1">Siyu Han</p>
              </div>
              <p>
                <strong>Contact:</strong> 
                <a href="mailto:xchen2232@wisc.edu" className="ms-2">
                  xchen2232@wisc.edu
                </a>
              </p>
              <p>
                <strong>Institution:</strong> University of Wisconsin-Madison
              </p>
            </div>
          <div className="mt-3">
            <h6>Feedback & Support:</h6>
            <p>
              If you encounter any issues or have suggestions for new features, 
              please don't hesitate to contact us. We're committed to continuously 
              improving WeatherStyle to better serve your weather and styling needs.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowContact(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Footer;
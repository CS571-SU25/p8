import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SettingsContext } from '../contexts/SettingsContext';

function Footer() {
  const { theme } = useContext(SettingsContext);
  
  const footerClass = theme === 'dark' ? 'footer bg-dark py-4 mt-auto' : 'footer bg-light py-4 mt-auto';
  const textClass = theme === 'dark' ? 'text-light' : 'text-dark';

  return (
    <footer className={footerClass}>
      <Container>
        <Row>
          <Col md={6}>
            <h5 className={textClass}>Weather App</h5>
            <p className={textClass}>Your reliable source for weather forecasts and information.</p>
          </Col>
          <Col md={3}>
            <h5 className={textClass}>Links</h5>
            <ul className="list-unstyled">
              <li><a href="#/" className={textClass}>Home</a></li>
              <li><a href="#/" className={textClass}>About</a></li>
              <li><a href="#/" className={textClass}>Contact</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
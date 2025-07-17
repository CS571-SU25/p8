import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="footer bg-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Weather App</h5>
            <p>Your reliable source for weather forecasts and information.</p>
          </Col>
          <Col md={3}>
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><a href="#/">Home</a></li>
              <li><a href="#/">About</a></li>
              <li><a href="#/">Contact</a></li>
            </ul>
          </Col>

        </Row>

      </Container>
    </footer>
  );
}

export default Footer;
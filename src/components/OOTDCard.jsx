import React from 'react';
import { Card, Button, Badge, Row, Col } from 'react-bootstrap';
import { Heart, InfoCircle } from 'react-bootstrap-icons';

function OOTDCard({ outfit, onRefresh, onOpenPreferences }) {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Outfit Recommendations</h5>
          <div>
            <Button variant="primary" size="sm" className="me-2" onClick={onOpenPreferences}>Preferences</Button>
            <Button variant="secondary" size="sm" onClick={onRefresh}>Refresh</Button>
          </div>
        </div>
        <Row>
          <Col md={4}>
            <Card.Img src={outfit.image} />
            <div className="d-flex justify-content-end mt-2">
              <Heart className="me-2" />
              <InfoCircle />
            </div>
          </Col>
          <Col md={8}>
            <Card.Title>{outfit.title}</Card.Title>
            <Card.Text>{outfit.description}</Card.Text>
            <div>
              {outfit.tags.map((tag, index) => (
                <Badge pill bg="light" text="dark" key={index} className="me-1">
                  {tag}
                </Badge>
              ))}
            </div>
          </Col>
        </Row>
        <div className="mt-3 p-3 bg-light rounded">
          <strong>Perfect for rainy weather in New York</strong>
          <div>Temperature: 18°C • Humidity: 7% • Wind: 9 km/h</div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default OOTDCard;
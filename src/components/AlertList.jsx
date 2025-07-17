import React, { useContext } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Bell, BellSlash, Trash, ThermometerHalf, CloudRain } from 'react-bootstrap-icons';
import { AlertsContext } from '../contexts/AlertsContext';

function AlertList() {
  const { alerts, toggleAlert, removeAlert } = useContext(AlertsContext);

  const getIcon = (type) => {
    switch (type) {
      case 'High temperature':
        return <ThermometerHalf size={24} className="text-danger" />;
      case 'Rain':
        return <CloudRain size={24} className="text-primary" />;
      default:
        return null;
    }
  };

  return (
    <Card className="p-4 shadow-sm">
      <h4 className="mb-4">Weather Alerts</h4>
      {alerts.map((alert) => (
        <Card key={alert.id} className="mb-3 border-0 shadow-sm">
          <Card.Body>
            <Row className="align-items-center">
              <Col xs="auto">{getIcon(alert.type)}</Col>
              <Col>
                <h6>{alert.title}</h6>
                <p className="mb-0 text-muted">{alert.description}</p>
              </Col>
              <Col xs="auto">
                <Button variant="link" onClick={() => toggleAlert(alert.id)} className="text-secondary me-2">
                  {alert.enabled ? <BellSlash /> : <Bell />}
                </Button>
                <Button variant="link" onClick={() => removeAlert(alert.id)} className="text-danger">
                  <Trash />
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Card>
  );
}

export default AlertList;
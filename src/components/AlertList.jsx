import React, { useContext } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Bell, BellSlash, Trash, ThermometerHalf, CloudRain, CloudLightningRain, Wind } from 'react-bootstrap-icons';
import { AlertsContext } from '../contexts/AlertsContext';

function AlertList() {
  const { alerts, toggleAlert, removeAlert } = useContext(AlertsContext);

  const getIcon = (type) => {
    switch (type) {
      case 'High temperature':
        return <ThermometerHalf size={24} className="text-danger" />;
      case 'Rain':
        return <CloudRain size={24} className="text-primary" />;
      case 'Storm':
        return <CloudLightningRain size={24} className="text-warning" />;
      case 'Wind':
        return <Wind size={24} className="text-info" />;
      default:
        return <Bell size={24} className="text-secondary" />;
    }
  };

  if (alerts.length === 0) {
    return (
      <Card className="p-4 shadow-sm">
        <h4 className="mb-4">Weather Alerts</h4>
        <div className="text-center py-4">
          <p className="text-muted">No alerts set up yet.</p>
          <p className="text-muted small">Click "Add Alert" to create your first weather alert.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 shadow-sm">
      <h4 className="mb-4">Weather Alerts ({alerts.length})</h4>
      {alerts.map((alert) => (
        <Card key={alert.id} className="mb-3 border-0 shadow-sm">
          <Card.Body>
            <Row className="align-items-center">
              <Col xs="auto">{getIcon(alert.type)}</Col>
              <Col>
                <h6 className="mb-1">{alert.title}</h6>
                <p className="mb-0 text-muted small">{alert.description}</p>
                <small className="text-muted">Type: {alert.type}</small>
              </Col>
              <Col xs="auto">
                <Button 
                  variant="link" 
                  onClick={() => toggleAlert(alert.id)} 
                  className="text-secondary me-2"
                  title={alert.enabled ? "Disable alert" : "Enable alert"}
                >
                  {alert.enabled ? <BellSlash /> : <Bell />}
                </Button>
                <Button 
                  variant="link" 
                  onClick={() => removeAlert(alert.id)} 
                  className="text-danger"
                  title="Delete alert"
                >
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
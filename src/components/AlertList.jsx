import React, { useContext } from 'react';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { 
  Bell, BellSlash, Trash, ThermometerHalf, CloudRain, CloudLightningRain, 
  Wind, Droplet, Speedometer2, Sun, ExclamationTriangle 
} from 'react-bootstrap-icons';
import { AlertsContext } from '../contexts/AlertsContext';
import { WeatherContext } from '../contexts/WeatherContext';

function AlertList() {
  const { alerts, toggleAlert, removeAlert, clearAllAlerts, notificationPermission } = useContext(AlertsContext);
  const { current } = useContext(WeatherContext);

  const getIcon = (type) => {
    switch (type) {
      case 'temperature':
        return <ThermometerHalf size={24} className="text-danger" />;
      case 'precipitation':
        return <CloudRain size={24} className="text-primary" />;
      case 'wind':
        return <Wind size={24} className="text-info" />;
      case 'humidity':
        return <Droplet size={24} className="text-info" />;
      case 'pressure':
        return <Speedometer2 size={24} className="text-secondary" />;
      case 'uv':
        return <Sun size={24} className="text-warning" />;
      case 'air_quality':
        return <ExclamationTriangle size={24} className="text-danger" />;
      case 'general':
        return <Bell size={24} className="text-secondary" />;
      // Legacy support
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

  const getPriorityBadge = (priority) => {
    const variants = {
      low: 'secondary',
      medium: 'primary',
      high: 'warning',
      urgent: 'danger'
    };
    return <Badge bg={variants[priority] || 'secondary'}>{priority?.toUpperCase() || 'MEDIUM'}</Badge>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };





  if (alerts.length === 0) {
    return (
      <Card className="p-4 shadow-sm">
        <h4 className="mb-4 weather-alerts-title">Weather Alerts</h4>
        <div className="text-center py-4">
          <p className="text-muted">No alerts set up yet.</p>
          <p className="text-muted small">Click "Add Alert" to create your first weather alert.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0 weather-alerts-title">Weather Alerts ({alerts.length})</h4>
        <div>
          {notificationPermission !== 'granted' && (
            <Badge bg="warning" className="me-2">
              Browser notifications disabled
            </Badge>
          )}
          {alerts.length > 0 && (
            <Button 
              variant="outline-danger" 
              size="sm" 
              onClick={clearAllAlerts}
              title="Clear all alerts"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>
      
      {alerts.map((alert) => (
        <Card key={alert.id} className={`mb-3 border-0 shadow-sm ${!alert.enabled ? 'opacity-75' : ''}`}>
          <Card.Body>
            <Row className="align-items-start">
              <Col xs="auto" className="pt-1">{getIcon(alert.type)}</Col>
              <Col>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <h6 className="mb-0">{alert.title}</h6>
                  {getPriorityBadge(alert.priority)}
                  {!alert.enabled && <Badge bg="secondary">DISABLED</Badge>}
                </div>
                
                <p className="mb-2 text-muted small">{alert.description}</p>
                
                <div className="d-flex flex-wrap gap-3 small text-muted">
                  {alert.settings?.threshold && (
                    <span>
                      <strong>Threshold:</strong> {alert.condition} {alert.settings.threshold}
                      {alert.type === 'temperature' ? '°C' : 
                       alert.type === 'wind' ? ' km/h' : 
                       alert.type === 'humidity' ? '%' : ''}
                    </span>
                  )}
                  {alert.settings?.location && (
                    <span><strong>Location:</strong> {alert.settings.location}</span>
                  )}
                  {alert.notificationTime && alert.notificationTime !== 'immediate' && (
                    <span><strong>Notify:</strong> {alert.notificationTime} before</span>
                  )}
                  {alert.createdAt && (
                    <span><strong>Created:</strong> {formatDate(alert.createdAt)}</span>
                  )}
                </div>
              </Col>
              <Col xs="auto">
                <div className="d-flex flex-column gap-1">

                  <Button 
                    variant="link" 
                    onClick={() => toggleAlert(alert.id)} 
                    className={`text-${alert.enabled ? 'success' : 'secondary'} p-1`}
                    title={alert.enabled ? "Disable alert" : "Enable alert"}
                    size="sm"
                  >
                    {alert.enabled ? <Bell size={18} /> : <BellSlash size={18} />}
                  </Button>
                  <Button 
                    variant="link" 
                    onClick={() => removeAlert(alert.id)} 
                    className="text-danger p-1"
                    title="Delete alert"
                    size="sm"
                  >
                    <Trash size={18} />
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Card>
  );
}

export default AlertList;
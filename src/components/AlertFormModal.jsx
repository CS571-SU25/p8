import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { AlertsContext } from '../contexts/AlertsContext';

function AlertFormModal({ show, handleClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('temperature');
  const [priority, setPriority] = useState('medium');
  const [threshold, setThreshold] = useState('');
  const [condition, setCondition] = useState('above');
  const [location, setLocation] = useState('');
  const [notificationTime, setNotificationTime] = useState('immediate');
  const { addAlert } = useContext(AlertsContext);

  const alertTypes = {
    temperature: 'Temperature Alert',
    precipitation: 'Rain/Snow Alert',
    wind: 'Wind Speed Alert',
    humidity: 'Humidity Alert',
    pressure: 'Air Pressure Alert',
    uv: 'UV Index Alert',
    air_quality: 'Air Quality Alert',
    general: 'General Weather Alert'
  };

  const handleSubmit = () => {
    if (title.trim()) {
      const alertData = {
        title: title.trim(),
        description: description.trim() || getAutoDescription(),
        type,
        priority,
        threshold: threshold ? parseFloat(threshold) : null,
        condition,
        location: location.trim() || 'Current Location',
        notificationTime,
        settings: {
          threshold,
          condition,
          location
        }
      };
      
      addAlert(alertData);
      resetForm();
      handleClose();
    }
  };

  const getAutoDescription = () => {
    if (threshold && type !== 'general') {
      const unit = getUnit(type);
      return `Alert when ${alertTypes[type].toLowerCase()} is ${condition} ${threshold}${unit} in ${location || 'current location'}`;
    }
    return `${alertTypes[type]} notification`;
  };

  const getUnit = (alertType) => {
    switch (alertType) {
      case 'temperature': return '°C';
      case 'wind': return ' km/h';
      case 'humidity': return '%';
      case 'pressure': return ' hPa';
      case 'uv': return '';
      case 'precipitation': return '%';
      default: return '';
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setType('temperature');
    setPriority('medium');
    setThreshold('');
    setCondition('above');
    setLocation('');
    setNotificationTime('immediate');
  };

  const handleCloseModal = () => {
    resetForm();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create Smart Weather Alert</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Alert Type</Form.Label>
                <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                  {Object.entries(alertTypes).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Alert Title</Form.Label>
            <Form.Control 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a descriptive title for your alert"
              required
            />
          </Form.Group>

          {type !== 'general' && (
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Condition</Form.Label>
                  <Form.Select value={condition} onChange={(e) => setCondition(e.target.value)}>
                    <option value="above">Above</option>
                    <option value="below">Below</option>
                    <option value="equals">Equals</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Threshold Value</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={threshold} 
                    onChange={(e) => setThreshold(e.target.value)}
                    placeholder={`Enter value${getUnit(type)}`}
                    step={type === 'temperature' ? '0.1' : '1'}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City name (optional)"
                  />
                </Form.Group>
              </Col>
            </Row>
          )}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Notification Timing</Form.Label>
                <Form.Select value={notificationTime} onChange={(e) => setNotificationTime(e.target.value)}>
                  <option value="immediate">Immediate</option>
                  <option value="15min">15 minutes before</option>
                  <option value="1hour">1 hour before</option>
                  <option value="3hours">3 hours before</option>
                  <option value="1day">1 day before</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Custom Description (Optional)</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder={getAutoDescription()}
            />
            <Form.Text className="text-muted">
              Leave empty to use auto-generated description
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!title.trim()}>
          Create Alert
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AlertFormModal;
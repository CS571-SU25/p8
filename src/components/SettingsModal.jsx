import React, { useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { SettingsContext } from '../contexts/SettingsContext';

function SettingsModal({ show, handleClose }) {
  const { units, setUnits, theme, setTheme } = useContext(SettingsContext);

  const handleSave = () => {
    // The context is already updated on change, so we just need to close the modal.
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Temperature Unit</Form.Label>
            <Form.Select value={units} onChange={(e) => setUnits(e.target.value)}>
              <option value="metric">Celsius</option>
              <option value="imperial">Fahrenheit</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Theme</Form.Label>
            <Form.Select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SettingsModal;
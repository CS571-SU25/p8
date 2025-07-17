import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function SettingsModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Temperature Unit</Form.Label>
            <Form.Select>
              <option>Celsius</option>
              <option>Fahrenheit</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Theme</Form.Label>
            <Form.Select>
              <option>Light</option>
              <option>Dark</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleClose}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SettingsModal;
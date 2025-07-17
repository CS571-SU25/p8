import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { AlertsContext } from '../contexts/AlertsContext';

function AlertFormModal({ show, handleClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addAlert } = useContext(AlertsContext);

  const handleSubmit = () => {
    addAlert({ title, description });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Alert</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Save Alert</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AlertFormModal;
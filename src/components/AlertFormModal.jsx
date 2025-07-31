import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { AlertsContext } from '../contexts/AlertsContext';

function AlertFormModal({ show, handleClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('High temperature');
  const { addAlert } = useContext(AlertsContext);

  const handleSubmit = () => {
    if (title.trim() && description.trim()) {
      addAlert({ title, description, type });
      setTitle('');
      setDescription('');
      setType('High temperature');
      handleClose();
    }
  };

  const handleCloseModal = () => {
    setTitle('');
    setDescription('');
    setType('High temperature');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Alert</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Alert Type</Form.Label>
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="High temperature">High Temperature</option>
              <option value="Rain">Rain</option>
              <option value="Storm">Storm</option>
              <option value="Wind">Wind</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter alert title"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter alert description"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!title.trim() || !description.trim()}>
          Save Alert
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AlertFormModal;
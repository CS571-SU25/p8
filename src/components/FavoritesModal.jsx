import React, { useContext } from 'react';
import { Modal, ListGroup, Button } from 'react-bootstrap';
import { FavoritesContext } from '../contexts/FavoritesContext';

function FavoritesModal({ show, handleClose }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Favorite Locations</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {favorites.map((fav) => (
            <ListGroup.Item key={fav.id} className="d-flex justify-content-between align-items-center">
              {fav.name}
              <Button variant="outline-danger" size="sm" onClick={() => toggleFavorite(fav)}>
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}

export default FavoritesModal;
import React, { useContext } from 'react';
import { Modal, ListGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { FaStar } from 'react-icons/fa';

function FavoritesModal({ show, handleClose }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Favorite Locations</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {favorites.length === 0 ? (
          <div className="text-center text-muted">
            <p>No favorite locations yet.</p>
            <p className="small">Search for a city and add it to your favorites!</p>
          </div>
        ) : (
          <ListGroup>
            {favorites.map((fav) => (
              <ListGroup.Item
                key={fav.id || `${fav.name}-${Date.now()}`}
                className="d-flex justify-content-between align-items-center"
              >
                <span>{fav.name}</span>
                <OverlayTrigger
                  placement="left"
                  overlay={<Tooltip>Remove from favorites</Tooltip>}
                >
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => toggleFavorite(fav)}
                    style={{ border: 'none', background: 'none', color: '#f5c518' }}
                    aria-label={`Remove ${fav.name} from favorites`}
                  >
                    <FaStar size={20} />
                  </Button>
                </OverlayTrigger>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default FavoritesModal;
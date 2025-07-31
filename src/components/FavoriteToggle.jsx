// src/components/FavoriteToggle.jsx
import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Star, StarFill } from 'react-bootstrap-icons';

function FavoriteToggle({ isFavorite, onToggle, locationName }) {
  return (
    <div className="d-flex flex-column align-items-start">
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id={`fav-tooltip-${locationName}`}>
            {isFavorite ? 'Click to remove from favorites' : 'Click to add to favorites'}
          </Tooltip>
        }
      >
        <Button
          variant={isFavorite ? 'warning' : 'outline-secondary'}
          onClick={onToggle}
          aria-label={
            isFavorite
              ? `Remove ${locationName} from favorites`
              : `Add ${locationName} to favorites`
          }
          className="d-flex align-items-center"
          size="sm"
        >
          {isFavorite ? <StarFill size={20} className="me-1" /> : <Star size={20} className="me-1" />}
          <span style={{ whiteSpace: 'nowrap', fontWeight: 600 }}>
            {isFavorite ? 'Favorited' : 'Add to favorites'}
          </span>
        </Button>
      </OverlayTrigger>
      <small className="text-muted mt-1">
        {isFavorite
          ? 'Saved to favorites'
          : 'Click the star to save this location for quick access'}
      </small>
    </div>
  );
}

export default FavoriteToggle;

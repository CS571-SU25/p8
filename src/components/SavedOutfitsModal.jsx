import React, { useContext, useState } from 'react';
import { Modal, Button, Card, Row, Col, Badge, Alert, Accordion } from 'react-bootstrap';
import { OutfitContext } from '../contexts/OutfitContext';
import { Trash, Heart, Calendar, Thermometer, Eye, GeoAlt } from 'react-bootstrap-icons';

function SavedOutfitsModal({ show, onHide }) {
  const { userPreferences, removeOutfit, outfitHistory } = useContext(OutfitContext);
  const [activeTab, setActiveTab] = useState('saved');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWeatherBadge = (weather) => {
    if (!weather) return null;
    
    const getVariant = (temp) => {
      if (temp > 25) return 'danger';
      if (temp > 15) return 'warning';
      if (temp > 5) return 'info';
      return 'primary';
    };

    return (
      <Badge bg={getVariant(weather.temp)} className="me-2">
        <Thermometer size={12} className="me-1" />
        {weather.temp}°C
      </Badge>
    );
  };

  const renderOutfitCard = (outfit, type = 'saved') => (
    <Card key={outfit.id} className="mb-3 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h6 className="mb-1">{outfit.title || 'Untitled Outfit'}</h6>
            <small className="text-muted">
              <Calendar size={12} className="me-1" />
              {formatDate(outfit.savedAt || outfit.timestamp)}
            </small>
          </div>
          <div className="d-flex gap-2">
            {type === 'saved' && (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeOutfit(outfit.id)}
                title="Delete outfit"
              >
                <Trash size={14} />
              </Button>
            )}
          </div>
        </div>

        <div className="mb-2">
          {getWeatherBadge(outfit.weather)}
          <Badge bg="secondary" className="me-2">{outfit.preferences?.gender || 'N/A'}</Badge>
          <Badge bg="info" className="me-2">{outfit.preferences?.purpose || 'N/A'}</Badge>
          {outfit.preferences?.style && <Badge bg="success">{outfit.preferences.style}</Badge>}
          {outfit.location && (
            <Badge bg="outline-secondary" className="ms-2">
              <GeoAlt size={12} className="me-1" />
              {outfit.location}
            </Badge>
          )}
        </div>

        {outfit.suggestion && (
          <Accordion className="mt-2">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <Eye size={14} className="me-2" />
                View Outfit Details
              </Accordion.Header>
              <Accordion.Body>
                <div className="outfit-details">
                  {outfit.suggestion.baseRecommendation && (
                    <div className="mb-3">
                      <h6>Base Recommendation:</h6>
                      <p className="mb-2">{outfit.suggestion.baseRecommendation}</p>
                    </div>
                  )}
                  
                  {outfit.suggestion.detailedSuggestion && (
                    <div className="mb-3">
                      <h6>Detailed Suggestion:</h6>
                      <p className="mb-2">{outfit.suggestion.detailedSuggestion}</p>
                    </div>
                  )}
                  
                  {typeof outfit.suggestion === 'string' && (
                    <div className="mb-3">
                      <h6>Outfit Suggestion:</h6>
                      <p className="mb-2">{outfit.suggestion}</p>
                    </div>
                  )}

                  {outfit.suggestion.essentials && outfit.suggestion.essentials.length > 0 && (
                    <div className="mb-3">
                      <h6>Essential Items:</h6>
                      <ul className="list-unstyled">
                        {outfit.suggestion.essentials.map((item, index) => (
                          <li key={index} className="mb-1">
                            <Badge bg="light" text="dark" className="me-2">•</Badge>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {outfit.suggestion.accessories && outfit.suggestion.accessories.length > 0 && (
                    <div className="mb-3">
                      <h6>Accessories:</h6>
                      <ul className="list-unstyled">
                        {outfit.suggestion.accessories.map((item, index) => (
                          <li key={index} className="mb-1">
                            <Badge bg="light" text="dark" className="me-2">•</Badge>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {outfit.suggestion.colors && outfit.suggestion.colors.length > 0 && (
                    <div className="mb-3">
                      <h6>Recommended Colors:</h6>
                      <div>
                        {outfit.suggestion.colors.map((color, index) => (
                          <Badge key={index} bg="secondary" className="me-1 mb-1">
                            {color}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {outfit.suggestion.tips && outfit.suggestion.tips.length > 0 && (
                    <div>
                      <h6>Style Tips:</h6>
                      <ul className="list-unstyled">
                        {outfit.suggestion.tips.map((tip, index) => (
                          <li key={index} className="mb-1">
                            <Badge bg="light" text="dark" className="me-2">💡</Badge>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      </Card.Body>
    </Card>
  );

  return (
    <Modal show={show} onHide={onHide} size="lg" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>
          <Heart className="me-2" />
          My Outfits
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <Button
            variant={activeTab === 'saved' ? 'primary' : 'outline-primary'}
            className="me-2"
            onClick={() => setActiveTab('saved')}
          >
            Saved Outfits ({userPreferences.savedOutfits?.length || 0})
          </Button>
          <Button
            variant={activeTab === 'history' ? 'primary' : 'outline-primary'}
            onClick={() => setActiveTab('history')}
          >
            History ({outfitHistory?.length || 0})
          </Button>
        </div>

        {activeTab === 'saved' && (
          <div>
            {userPreferences.savedOutfits?.length > 0 ? (
              <Row>
                <Col>
                  {userPreferences.savedOutfits.map(outfit => renderOutfitCard(outfit, 'saved'))}
                </Col>
              </Row>
            ) : (
              <Alert variant="info">
                <Heart className="me-2" />
                No saved outfits yet. Save your favorite outfit suggestions from the OOTD card!
              </Alert>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            {outfitHistory?.length > 0 ? (
              <Row>
                <Col>
                  {outfitHistory.map(outfit => renderOutfitCard(outfit, 'history'))}
                </Col>
              </Row>
            ) : (
              <Alert variant="info">
                <Calendar className="me-2" />
                No outfit history yet. Your outfit suggestions will appear here automatically.
              </Alert>
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SavedOutfitsModal;
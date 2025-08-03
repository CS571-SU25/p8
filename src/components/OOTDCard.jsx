import React, { useContext, useState, useEffect } from 'react';
import { Card, Form, Button, Badge, Accordion, Row, Col } from 'react-bootstrap';
import { Heart, HeartFill, Clock, Bookmark, BookmarkFill } from 'react-bootstrap-icons';
import { WeatherContext } from '../contexts/WeatherContext';
import { SettingsContext } from '../contexts/SettingsContext';
import { OutfitContext } from '../contexts/OutfitContext';
import { getEnhancedOutfitSuggestion } from '../utils/enhancedSuggestionEngine';

const suggestionEngine = {
  weather: {
    rain: 'Waterproof jacket, umbrella, and non-slip shoes are essential. ',
    hot: 'T-shirt and shorts are great. Stay hydrated! ',
    warm: 'A light jacket or long-sleeve shirt will be comfortable. ',
    cool: 'A sweater or a medium jacket is a good idea. ',
    cold: 'Wear a heavy coat, scarf, and gloves. ',
  },
  gender: {
    female: {
      hot: 'A summer dress or a skirt would be lovely. ',
      warm: 'A stylish cardigan can complete your look. ',
      cool: 'A chic trench coat is perfect for this weather. ',
      cold: 'A fashionable wool coat and a warm scarf. ',
    },
    male: {
      hot: 'Linen pants or shorts will keep you cool. ',
      warm: 'A bomber jacket is a versatile choice. ',
      cool: 'A classic denim jacket never goes out of style. ',
      cold: 'A warm beanie and a parka will keep you toasty. ',
    },
  },
  purpose: {
    business: 'For a professional look, pair with dress pants/skirt and a formal shirt. ',
    sport: 'Opt for moisture-wicking athletic wear and comfortable sneakers. ',
    casual: 'Jeans or casual trousers with a comfortable top are perfect. ',
  },
};

const getOutfitSuggestion = (temp, condition, gender, purpose) => {
  let weatherKey;
  if (condition.toLowerCase().includes('rain')) weatherKey = 'rain';
  else if (temp > 25) weatherKey = 'hot';
  else if (temp > 18) weatherKey = 'warm';
  else if (temp > 10) weatherKey = 'cool';
  else weatherKey = 'cold';

  let suggestion = suggestionEngine.weather[weatherKey];
  suggestion += suggestionEngine.gender[gender][weatherKey] || '';
  suggestion += suggestionEngine.purpose[purpose];

  return suggestion;
};

function OOTDCard() {
  const { current, locationName, loading } = useContext(WeatherContext);
  const { theme } = useContext(SettingsContext);
  const { userPreferences, updatePreferences, saveOutfit, addToHistory } = useContext(OutfitContext);
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  // Update local state when preferences change
  useEffect(() => {
    if (current && locationName) {
      const weatherData = { temp: current.temp, condition: current.description };
      const suggestion = getEnhancedOutfitSuggestion(weatherData, userPreferences);
      setCurrentSuggestion(suggestion);
      
      // Add to history only when weather or location changes, not preferences
      const historyKey = `${locationName}-${current.temp}-${current.description}`;
      const lastHistoryKey = localStorage.getItem('lastOutfitHistoryKey');
      
      if (historyKey !== lastHistoryKey) {
        addToHistory({
          weather: weatherData,
          location: locationName,
          preferences: { ...userPreferences },
          suggestion: suggestion,
          title: `${userPreferences.purpose} outfit for ${locationName}`
        });
        localStorage.setItem('lastOutfitHistoryKey', historyKey);
      }
    }
  }, [current, locationName, userPreferences, addToHistory]);

  if (loading) {
    return (
      <Card className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}>
        <Card.Body>
          <div className="text-center py-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading outfit recommendations...</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  if (!current || !locationName) {
    return (
      <Card className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}>
        <Card.Body>
          <div className="text-center py-4">
            <p className="text-muted">No weather data available for outfit recommendations.</p>
            <p className="small">Please search for a location to get personalized outfit suggestions.</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  const handlePreferenceChange = (key, value) => {
    updatePreferences({ [key]: value });
  };

  const handleSaveOutfit = () => {
    if (currentSuggestion) {
      saveOutfit({
        weather: { temp: current.temp, condition: current.description },
        location: locationName,
        preferences: { ...userPreferences },
        suggestion: currentSuggestion,
        title: `${userPreferences.purpose} outfit for ${locationName} (${current.temp}°C)`
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const cardClass = theme === 'dark' ? 'bg-dark text-light border-secondary' : '';
  const bgClass = theme === 'dark' ? 'bg-secondary' : 'bg-light';

  if (!currentSuggestion) {
    return (
      <Card className={cardClass}>
        <Card.Body>
          <div className="text-center py-4">
            <p>Generating personalized outfit recommendations...</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className={cardClass}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h5 mb-0">Smart Outfit Recommendations</h2>
          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleSaveOutfit}
              disabled={isSaved}
            >
              {isSaved ? <BookmarkFill /> : <Bookmark />}
              {isSaved ? ' Saved!' : ' Save'}
            </Button>
          </div>
        </div>

        {/* Weather Info */}
        <div className={`p-3 ${bgClass} rounded mb-3`}>
          <Row>
            <Col md={8}>
              <div className="mb-2">
                <strong>Weather in {locationName}:</strong>
                <div className="d-flex align-items-center gap-2 mt-1">
                  <span>{current.temp}°C • {current.description}</span>
                  <Badge bg={currentSuggestion.weatherCategory === 'hot' ? 'danger' : 
                            currentSuggestion.weatherCategory === 'cold' ? 'primary' : 'secondary'}>
                    {currentSuggestion.weatherCategory.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </Col>
            <Col md={4} className="text-end">
              <Button
                variant="link"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="p-0"
              >
                {showAdvanced ? 'Simple View' : 'Advanced Settings'}
              </Button>
            </Col>
          </Row>
        </div>

        {/* Main Recommendation */}
        <div className="mb-3">
          <h6 className="mb-2">Today's Recommendation:</h6>
          <div className={`p-3 ${bgClass} rounded`}>
            <p className="mb-2"><strong>{currentSuggestion.baseRecommendation}</strong></p>
            <p className="mb-0">{currentSuggestion.detailedSuggestion}</p>
          </div>
        </div>

        {/* Quick Preferences */}
        <Form className="mb-3">
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label><strong>Gender:</strong></Form.Label>
                <div>
                  <Form.Check 
                    inline 
                    type="radio" 
                    name="gender" 
                    value="male" 
                    checked={userPreferences.gender === 'male'} 
                    onChange={(e) => handlePreferenceChange('gender', e.target.value)}
                    label="Male"
                  />
                  <Form.Check 
                    inline 
                    type="radio" 
                    name="gender" 
                    value="female" 
                    checked={userPreferences.gender === 'female'} 
                    onChange={(e) => handlePreferenceChange('gender', e.target.value)}
                    label="Female"
                  />
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label><strong>Purpose:</strong></Form.Label>
                <Form.Select
                  value={userPreferences.purpose}
                  onChange={(e) => handlePreferenceChange('purpose', e.target.value)}
                  size="sm"
                >
                  <option value="casual">Casual</option>
                  <option value="business">Business</option>
                  <option value="sport">Sport</option>
                  <option value="formal">Formal</option>
                  <option value="outdoor">Outdoor</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        {/* Advanced Settings */}
        {showAdvanced && (
          <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Advanced Preferences</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Style Preference:</strong></Form.Label>
                      <Form.Select
                        value={userPreferences.style}
                        onChange={(e) => handlePreferenceChange('style', e.target.value)}
                      >
                        <option value="modern">Modern</option>
                        <option value="classic">Classic</option>
                        <option value="trendy">Trendy</option>
                        <option value="bohemian">Bohemian</option>
                        <option value="minimalist">Minimalist</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Weather Sensitivity:</strong></Form.Label>
                      <Form.Select
                        value={userPreferences.weatherSensitivity}
                        onChange={(e) => handlePreferenceChange('weatherSensitivity', e.target.value)}
                      >
                        <option value="resistant">Less Sensitive</option>
                        <option value="normal">Normal</option>
                        <option value="sensitive">More Sensitive</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label><strong>Color Preference:</strong></Form.Label>
                  <Form.Select
                    value={userPreferences.colorPreference}
                    onChange={(e) => handlePreferenceChange('colorPreference', e.target.value)}
                  >
                    <option value="neutral">Neutral Colors</option>
                    <option value="bright">Bright Colors</option>
                    <option value="dark">Dark Colors</option>
                    <option value="pastel">Pastel Colors</option>
                  </Form.Select>
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="1">
              <Accordion.Header>Detailed Suggestions</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col md={6}>
                    <h6>Essential Items:</h6>
                    <ul className="small">
                      {currentSuggestion.essentialItems.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </Col>
                  <Col md={6}>
                    <h6>Accessories:</h6>
                    <ul className="small">
                      {currentSuggestion.accessories.map((accessory, index) => (
                        <li key={index}>{accessory}</li>
                      ))}
                    </ul>
                  </Col>
                </Row>
                
                <h6>Color Suggestions:</h6>
                <div className="d-flex flex-wrap gap-1 mb-3">
                  {currentSuggestion.colorSuggestions.map((color, index) => (
                    <Badge key={index} bg="secondary" className="small">{color}</Badge>
                  ))}
                </div>
                
                <h6>Tips:</h6>
                <ul className="small mb-0">
                  {currentSuggestion.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      </Card.Body>
    </Card>
  );
}

export default OOTDCard;
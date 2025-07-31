import React, { useContext, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { WeatherContext } from '../contexts/WeatherContext';
import { SettingsContext } from '../contexts/SettingsContext';

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
  const [gender, setGender] = useState('male');
  const [purpose, setPurpose] = useState('casual');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!current || !locationName) {
    return <div>No weather data available.</div>;
  }

  const temp = current.temp;
  const condition = current.description;
  const suggestion = getOutfitSuggestion(temp, condition, gender, purpose);

  const cardClass = theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark';
  const bgClass = theme === 'dark' ? 'bg-secondary' : 'bg-light';

  return (
    <Card className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}>
      <Card.Body>
        <h5 className="mb-3">Outfit of the Day</h5>
        <div className={`p-3 ${bgClass} rounded`}>
          <div className="mb-2">
            <strong>Weather in {locationName}:</strong>
            <div>Temperature: {temp}°C • Condition: {condition}</div>
          </div>
          <Form className="my-3">
            <Form.Group>
              <Form.Label><strong>Gender:</strong></Form.Label>
              <div>
                <Form.Check inline type="radio" label="Male" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
                <Form.Check inline type="radio" label="Female" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
              </div>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label><strong>Purpose of Outing:</strong></Form.Label>
              <div>
                <Form.Check inline type="radio" label="Casual" name="purpose" value="casual" checked={purpose === 'casual'} onChange={(e) => setPurpose(e.target.value)} />
                <Form.Check inline type="radio" label="Business" name="purpose" value="business" checked={purpose === 'business'} onChange={(e) => setPurpose(e.target.value)} />
                <Form.Check inline type="radio" label="Sport" name="purpose" value="sport" checked={purpose === 'sport'} onChange={(e) => setPurpose(e.target.value)} />
              </div>
            </Form.Group>
          </Form>
          <div className="mt-2">
            <strong>Outfit Suggestion:</strong>
            <div>{suggestion}</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default OOTDCard;
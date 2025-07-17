import React, { useState, useContext } from 'react';
import { Container, Navbar, Form, Button } from 'react-bootstrap';
import { Star, ArrowClockwise, Gear, Heart } from 'react-bootstrap-icons';
import FavoritesModal from './FavoritesModal';
import SettingsModal from './SettingsModal';
import { WeatherContext } from '../contexts/WeatherContext';
function Header() {
  const [showFavorites, setShowFavorites] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { fetchWeather } = useContext(WeatherContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchWeather(searchTerm.trim());
    }
  };

  return (
    <>
      <Navbar expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#/"><strong>WeatherStyle</strong></Navbar.Brand>
          <Form className="d-flex mx-auto" style={{ width: '50%' }} onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search for a city..."
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
          <div>
            <Button variant="link" className="text-dark me-2" onClick={() => setShowFavorites(true)}><Heart /></Button>
            <Button variant="link" className="text-dark me-2"><ArrowClockwise /></Button>
            <Button variant="link" className="text-dark" onClick={() => setShowSettings(true)}><Gear /></Button>
          </div>
        </Container>
      </Navbar>

      <FavoritesModal show={showFavorites} handleClose={() => setShowFavorites(false)} />
      <SettingsModal show={showSettings} handleClose={() => setShowSettings(false)} />
    </>
  );
}

export default Header;
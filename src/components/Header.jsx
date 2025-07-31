import React, { useState, useContext } from 'react';
import { Container, Navbar, Form, Button } from 'react-bootstrap';
import { Star, ArrowClockwise, Gear, Heart } from 'react-bootstrap-icons';
import FavoritesModal from './FavoritesModal';
import SettingsModal from './SettingsModal';
import { WeatherContext } from '../contexts/WeatherContext';
import { SettingsContext } from '../contexts/SettingsContext';

function Header() {
  const [showFavorites, setShowFavorites] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { fetchWeather } = useContext(WeatherContext);
  const { theme } = useContext(SettingsContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchWeather(searchTerm.trim());
    }
  };

  const navbarClass = theme === 'dark' 
    ? 'mb-4 bg-dark text-light shadow-lg' 
    : 'mb-4 bg-light text-dark shadow';

  const buttonClass = theme === 'dark' ? 'text-light' : 'text-dark';

  return (
    <>
      <Navbar expand="lg" className={navbarClass}>
        <Container>
          <Navbar.Brand href="#/" className={buttonClass}><strong>WeatherStyle</strong></Navbar.Brand>
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
            <Button variant="link" className={`${buttonClass} me-2`} onClick={() => setShowFavorites(true)}><Heart /></Button>
            <Button variant="link" className={`${buttonClass} me-2`}><ArrowClockwise /></Button>
            <Button variant="link" className={buttonClass} onClick={() => setShowSettings(true)}><Gear /></Button>
          </div>
        </Container>
      </Navbar>

      <FavoritesModal show={showFavorites} handleClose={() => setShowFavorites(false)} />
      <SettingsModal show={showSettings} handleClose={() => setShowSettings(false)} />
    </>
  );
}

export default Header;
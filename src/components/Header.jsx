import React, { useState, useContext } from 'react';
import { Container, Navbar, Form, Button, Nav } from 'react-bootstrap';
import { Star, ArrowClockwise, Gear, Heart } from 'react-bootstrap-icons';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchWeather(searchTerm.trim());
    }
  };

  const handleRefresh = () => {
    // Refresh current weather data
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
      <Navbar expand="lg" className={navbarClass} role="banner">
        <Container>
          <Navbar.Brand as={Link} to="/" className={buttonClass} aria-label="WeatherStyle Home">
            <strong>WeatherStyle</strong>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className={buttonClass} active={location.pathname === '/'}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/overview" className={buttonClass} active={location.pathname === '/overview'}>
                Overview
              </Nav.Link>
              <Nav.Link as={Link} to="/ootd" className={buttonClass} active={location.pathname === '/ootd'}>
                OOTD
              </Nav.Link>
              <Nav.Link as={Link} to="/alerts" className={buttonClass} active={location.pathname === '/alerts'}>
                Alerts
              </Nav.Link>
            </Nav>
            
            <Form className="d-flex mx-auto" style={{ width: '40%' }} onSubmit={handleSearch} role="search">
              <Form.Control
                type="search"
                placeholder="Search for a city..."
                className="me-2"
                aria-label="Search for a city"
                aria-describedby="search-help"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-success" type="submit" aria-label="Search weather">
                Search
              </Button>
            </Form>
            
            <div role="toolbar" aria-label="Weather app controls">
              <Button 
                variant="link" 
                className={`${buttonClass} me-2`} 
                onClick={() => setShowFavorites(true)}
                aria-label="View favorites"
                title="View favorite locations"
              >
                <Heart />
              </Button>
              <Button 
                variant="link" 
                className={`${buttonClass} me-2`}
                onClick={handleRefresh}
                aria-label="Refresh weather data"
                title="Refresh current weather data"
              >
                <ArrowClockwise />
              </Button>
              <Button 
                variant="link" 
                className={buttonClass} 
                onClick={() => setShowSettings(true)}
                aria-label="Open settings"
                title="Open app settings"
              >
                <Gear />
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div id="search-help" className="sr-only">
        Enter a city name to search for weather information
      </div>

      <FavoritesModal show={showFavorites} handleClose={() => setShowFavorites(false)} />
      <SettingsModal show={showSettings} handleClose={() => setShowSettings(false)} />
    </>
  );
}

export default Header;
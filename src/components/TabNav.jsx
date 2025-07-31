import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { SettingsContext } from '../contexts/SettingsContext';

function TabNav() {
  const { theme } = useContext(SettingsContext);
  
  const navClass = theme === 'dark' 
    ? 'bg-dark text-light rounded-3 shadow-lg p-2 mb-3 nav-container justify-content-center' 
    : 'bg-light text-dark rounded-3 shadow p-2 mb-3 nav-container justify-content-center';

  return (
    <div className="d-flex justify-content-center">
      <Nav 
        variant="pills" 
        defaultActiveKey="/" 
        className={navClass} 
        style={{ maxWidth: '600px' }}
        role="tablist"
        aria-label="Weather app navigation"
      >
        <LinkContainer to="/">
          <Nav.Link 
            className="mx-1 px-2 py-1" 
            role="tab"
            aria-selected="true"
            aria-label="Overview tab - View current weather conditions"
          >
            Overview
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/ootd">
          <Nav.Link 
            className="mx-1 px-2 py-1" 
            role="tab"
            aria-label="OOTD tab - Outfit of the day recommendations"
          >
            OOTD
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/alerts">
          <Nav.Link 
            className="mx-1 px-2 py-1" 
            role="tab"
            aria-label="Alerts tab - Weather alerts and notifications"
          >
            Alerts
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/suntimes">
          <Nav.Link 
            className="mx-1 px-2 py-1" 
            role="tab"
            aria-label="Sun Times tab - Sunrise and sunset information"
          >
            Sun Times
          </Nav.Link>
        </LinkContainer>
      </Nav>
    </div>
  );
}

export default TabNav;
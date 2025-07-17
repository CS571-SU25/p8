import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function TabNav() {
  return (
    <Nav variant="pills" defaultActiveKey="/" className="justify-content-center mb-4">
      <LinkContainer to="/">
        <Nav.Link>Overview</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/ootd">
        <Nav.Link>OOTD</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/alerts">
        <Nav.Link>Alerts</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/suntimes">
        <Nav.Link>Sun Times</Nav.Link>
      </LinkContainer>
    </Nav>
  );
}

export default TabNav;
import React from 'react';
import { Card } from 'react-bootstrap';

function DetailTile({ icon, label, value }) {
  return (
    <Card className="text-center">
      <Card.Body>
        <div className="mb-2">{icon}</div>
        <h6>{label}</h6>
        <p className="mb-0">{value}</p>
      </Card.Body>
    </Card>
  );
}

export default DetailTile;
/** @format */

import React from "react";
import { ListGroup, Badge, Button } from "react-bootstrap";
export const UpdateShippingAddress = () => {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item className="m-auto justify-content-between settings-list-item">
        <div className="">
          <Button>Agregar +</Button>
        </div>
      </ListGroup.Item>
      <ListGroup.Item className="d-flex justify-content-between align-items-start settings-list-item">
        <div className="ms-2 me-auto">
          <div className="fw-bold">Subheading</div>
          Cras justo odio
        </div>
        <Badge variant="primary" pill>
          14
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start settings-list-item"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Subheading</div>
          Cras justo odio
        </div>
        <Badge variant="primary" pill>
          14
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start settings-list-item"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Subheading</div>
          Cras justo odio
        </div>
        <Badge variant="primary" pill>
          14
        </Badge>
      </ListGroup.Item>
    </ListGroup>
  );
};

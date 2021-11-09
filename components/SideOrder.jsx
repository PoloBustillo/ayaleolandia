/** @format */

import React from "react";
import Image from "next/image";
import { Row, Col } from "react-bootstrap";
export const SideOrder = () => {
  return (
    <div className="order">
      <Row className="order-avatar">
        <Col>
          <Image
            src="https://images.unsplash.com/photo-1498529605908-f357a9af7bf5?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2850&amp;q=80"
            alt=""
            height={90}
            width={90}
          />
        </Col>
        <Col>
          <span className="product-name">
            Anillos (3)<div className="order-sku">SKU:12302</div>
          </span>
        </Col>
      </Row>
      <div className="order-info">
        <div className="order-date">02/12/2021 7:00 - 8:40</div>
        <p className="order-p">Entrega Dalia Bustillo</p>
      </div>
    </div>
  );
};

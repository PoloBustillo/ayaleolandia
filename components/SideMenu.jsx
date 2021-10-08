/** @format */

import React from "react";
import { Row, Col } from "react-bootstrap";
import { bubble as Menu } from "react-burger-menu";

export const SideMenu = (props) => {
  return (
    <Menu
      isOpen={props.sideMenuStatus}
      onClose={() => {
        props.sideMenuFunc(false);
        console.log("cerrar");
      }}
    >
      <div className="container-avatar">
        <div className="avatar">
          <img
            src="https://images.unsplash.com/photo-1486116736668-6384736c9330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2850&amp;q=80"
            alt="user avatar"
          />
        </div>
        <div className="status">
          <h2>Hola Lia Sofia!</h2>
        </div>
      </div>
      <div className="side-item">
        <img
          className="side-icon"
          id="home-icon"
          src={"/home.png"}
          height="20px"
          width="20px"
          alt="Ir a home en Leolandia"
        />{" "}
        INICIO
      </div>
      <div className="side-item">
        <img
          className="side-icon"
          id="fashion-icon"
          src={"/fashion.png"}
          height="20px"
          width="20px"
          alt="Ir a colecciones de Leolandia"
        />{" "}
        COLECCIONES
      </div>
      <div className="side-item">
        <img
          className="side-icon"
          id="new-product-icon"
          src={"/newProduct.png"}
          height="20px"
          width="20px"
          alt="Nuevos Productos de Leolandia"
        />{" "}
        NUEVOS PRODUCTOS
      </div>
      <div className="side-item">
        <img
          className="side-icon"
          id="ship-icon"
          src={"/ship.png"}
          height="20px"
          width="20px"
          alt="Entregas y envios Leolandia"
        />{" "}
        ENTREGAS y ENVíOS
      </div>
      <div className="side-item">
        <img
          className="side-icon"
          id="location-icon"
          src={"/location.png"}
          height="20px"
          width="20px"
          alt="Localicar a  Leolandia"
        />{" "}
        CONTACTO
      </div>
      <div className="orders-side ">
        <div className="container-order">
          <span>
            Ordenes <span className="order-date">Ver todas</span>
          </span>
          <div className="order">
            <Row className="order-avatar">
              <Col>
                <img
                  src="https://images.unsplash.com/photo-1498529605908-f357a9af7bf5?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2850&amp;q=80"
                  alt=""
                />
              </Col>
              <Col>
                <span>
                  Anillos <div className="order-date">SKU:12302</div>
                </span>
              </Col>
            </Row>
            <div className="order-info">
              <div className="order-date">02/12/2021 7:00 - 8:40</div>
              <p className="order-p">Entrega Dalia Bustillo</p>
            </div>
          </div>
          <div className="order">
            <Row className="order-avatar">
              <Col>
                <img
                  src="https://images.unsplash.com/photo-1498529605908-f357a9af7bf5?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2850&amp;q=80"
                  alt=""
                />
              </Col>
              <Col>
                <span>
                  Anillos <div className="order-date">SKU:12302</div>
                </span>
              </Col>
            </Row>
            <div className="order-info">
              <div className="order-date">02/12/2021 7:00 - 8:40</div>
              <p className="order-p">Entrega Dalia Bustillo</p>
            </div>
          </div>
          <div className="order">
            <Row className="order-avatar">
              <Col>
                <img
                  src="https://images.unsplash.com/photo-1498529605908-f357a9af7bf5?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2850&amp;q=80"
                  alt=""
                />
              </Col>
              <Col>
                <span>
                  Anillos <div className="order-date">SKU:12302</div>
                </span>
              </Col>
            </Row>
            <div className="order-info">
              <div className="order-date">02/12/2021 7:00 - 8:40</div>
              <p className="order-p">Entrega Dalia Bustillo</p>
            </div>
          </div>
        </div>
      </div>
    </Menu>
  );
};

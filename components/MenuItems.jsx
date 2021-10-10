/** @format */

import React from "react";
import { Col, Row } from "react-bootstrap";

export const MenuItems = (props) => {
  return (
    <>
      <Col className={props.itemClass}>
        <img
          className="side-icon"
          id="home-icon"
          src={"/home.png"}
          height="20px"
          width="20px"
          alt="Ir a home en Leolandia"
        />{" "}
        INICIO
      </Col>
      <Col className={props.itemClass}>
        <img
          className="side-icon"
          id="fashion-icon"
          src={"/fashion.png"}
          height="20px"
          width="20px"
          alt="Ir a colecciones de Leolandia"
        />{" "}
        COLECCIONES
      </Col>
      <Col className={props.itemClass}>
        <img
          className="side-icon"
          id="new-product-icon"
          src={"/newProduct.png"}
          height="20px"
          width="20px"
          alt="Nuevos Productos de Leolandia"
        />{" "}
        NUEVOS PRODUCTOS
      </Col>
      <Col className={props.itemClass}>
        <img
          className="promose-icon"
          id="promos-icon"
          src={"/promos.png"}
          height="20px"
          width="20px"
          alt="Promociones de Leolandia"
        />{" "}
        PROMOCIONES
      </Col>
      <Col className={props.itemClass}>
        <img
          className="side-icon"
          id="ship-icon"
          src={"/ship.png"}
          height="20px"
          width="20px"
          alt="Entregas y envios Leolandia"
        />{" "}
        ENTREGAS y ENVíOS
      </Col>
      <Col className={props.itemClass}>
        <img
          className="side-icon"
          id="location-icon"
          src={"/location.png"}
          height="20px"
          width="20px"
          alt="Localicar a  Leolandia"
        />{" "}
        CONTACTO
      </Col>
    </>
  );
};

/** @format */

import React from "react";
import { Col } from "react-bootstrap";
import Link from "next/link";
import ShipIcon from "./icons/ShipIcon";
import PromosIcon from "./icons/PromoseIcon";
import PayMethods from "./icons/PayMethods";
import NewProducts from "./icons/NewProducts";
import HomeIcon from "./icons/HomeIcon";
export const MenuItems = (props) => {
  return (
    <>
      <Link href="/">
        <Col className={props.itemClass}>
          <HomeIcon className="home-icon" height="20px" width="20px"></HomeIcon>{" "}
          INICIO
        </Col>
      </Link>
      <Link href="/colecciones">
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
      </Link>
      <Col className={props.itemClass}>
        <NewProducts
          className="new-products-icon"
          height="20px"
          width="20px"
        ></NewProducts>{" "}
        NUEVOS PRODUCTOS
      </Col>
      <Col className={props.itemClass}>
        <PromosIcon
          className="promos-icon"
          height="20px"
          width="20px"
        ></PromosIcon>{" "}
        PROMOCIONES
      </Col>
      <Col className={props.itemClass}>
        <ShipIcon
          className="ship-icon"
          id="ship-icon"
          height="20px"
          width="20px"
        ></ShipIcon>{" "}
        ENTREGAS y ENVíOS
      </Col>
      {/* <Col className={props.itemClass}>
        <img
          className="side-icon"
          id="location-icon"
          src={"/location.png"}
          height="20px"
          width="20px"
          alt="Localicar a  Leolandia"
        />{" "}
        CONTACTO
      </Col> */}
      <Col className={props.itemClass}>
        <PayMethods
          className="payment-methods-icon"
          height="20px"
          width="20px"
        ></PayMethods>{" "}
        METODOS DE PAGO
      </Col>
    </>
  );
};

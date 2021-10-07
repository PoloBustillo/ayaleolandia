/** @format */

import React from "react";
import { Row } from "react-bootstrap";
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
      <div className="nav-item">
        <img
          className="nav-icon"
          id="home-icon"
          src={"/home.png"}
          height="20px"
          width="20px"
          alt="Ir a home en Leolandia"
        />{" "}
        INICIO
      </div>
      <div className="nav-item">
        <img
          className="nav-icon"
          id="fashion-icon"
          src={"/fashion.png"}
          height="20px"
          width="20px"
          alt="Ir a colecciones de Leolandia"
        />{" "}
        COLECCIONES
      </div>
      <div className="nav-item">
        <img
          className="nav-icon"
          id="new-product-icon"
          src={"/newProduct.png"}
          height="20px"
          width="20px"
          alt="Nuevos Productos de Leolandia"
        />{" "}
        NUEVOS PRODUCTOS
      </div>
      <div className="nav-item">
        <img
          className="nav-icon"
          id="ship-icon"
          src={"/ship.png"}
          height="20px"
          width="20px"
          alt="Entregas y envios Leolandia"
        />{" "}
        ENTREGAS y ENVíOS
      </div>
      <div className="nav-item">
        <img
          className="nav-icon"
          id="location-icon"
          src={"/location.png"}
          height="20px"
          width="20px"
          alt="Localicar a  Leolandia"
        />{" "}
        CONTACTO
      </div>
    </Menu>
  );
};

/** @format */

import React from "react";

export const SideItems = () => {
  return (
    <div className=" bm-item container-avatar">
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
    </div>
  );
};

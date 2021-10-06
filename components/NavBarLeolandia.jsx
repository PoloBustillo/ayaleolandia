/** @format */

import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

export const NavBarLeolandia = () => {
  return (
    <div className="navbar-container">
      <Row>
        <Col className="search-container">
          <img
            className="nav-icon"
            id="search-icon"
            src={"/search.png"}
            height="30px"
            alt="Buscar productos"
          />
        </Col>
        <Col className="d-none d-md-block">
          <h1 className="title">
            Joyerí
            <span id="aya-text">
              A<span className="dot">·</span>y<span className="dot">·</span>A
            </span>
            ccesorios
          </h1>
          <h3 className="by-title">
            <div>by Leolandia</div>
          </h3>
        </Col>
        <Col className="hidden-md">
          <div>
            <img
              className="nav-icon"
              id="logo-icon"
              src={"/logo.png"}
              height="50px"
              alt="joyeria y accesorios"
            />
            <span id="aya-text">
              A<span className="dot">·</span>y<span className="dot">·</span>A
            </span>
          </div>
          <h3 className="by-title">
            <div>by Leolandia</div>
          </h3>
        </Col>
        <Col className="tools-container">
          <img
            className="nav-icon"
            id="user-icon"
            src={"/usergirl.png"}
            height="30px"
            alt="Login"
          />{" "}
          <img
            className="nav-icon"
            id="user-icon"
            src={"/cart.png"}
            height="30px"
            alt="Carrito de compras"
          />
        </Col>
      </Row>
      <Row className="menu-nav d-none d-md-flex">
        <Col className="nav-item">
          <img
            className="nav-icon"
            id="home-icon"
            src={"/home.png"}
            height="20px"
            alt="Ir a home en Leolandia"
          />{" "}
          INICIO
        </Col>
        <Col className="nav-item">
          <img
            className="nav-icon"
            id="fashion-icon"
            src={"/fashion.png"}
            height="20px"
            alt="Ir a colecciones de Leolandia"
          />{" "}
          COLECCIONES
        </Col>
        <Col className="nav-item">
          <img
            className="nav-icon"
            id="new-product-icon"
            src={"/newProduct.png"}
            height="20px"
            alt="Nuevos Productos de Leolandia"
          />{" "}
          NUEVOS PRODUCTOS
        </Col>
        <Col className="nav-item">
          <img
            className="nav-icon"
            id="ship-icon"
            src={"/ship.png"}
            height="20px"
            alt="Entregas y envios Leolandia"
          />{" "}
          ENTREGAS y ENVíOS
        </Col>
        <Col className="nav-item">
          <img
            className="nav-icon"
            id="location-icon"
            src={"/location.png"}
            height="20px"
            alt="Localicar a  Leolandia"
          />{" "}
          CONTACTO
        </Col>
      </Row>
    </div>
  );
};

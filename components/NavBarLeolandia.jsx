/** @format */

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import HamburguerBtn from "./HamburguerBtn";
import { MenuItems } from "./MenuItems";
import { SearchBar } from "./SearchBar";
import useUser from "../hooks/useUser";

export const NavBarLeolandia = (props) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const user = useUser();

  return !searchOpen ? (
    <div className="navbar-container">
      <HamburguerBtn
        sideMenuStatus={props.sideMenuStatus}
        sideMenuFunc={props.sideMenuFunc}
      ></HamburguerBtn>
      <Row>
        <Col className="search-container">
          <img
            onClick={() => {
              setSearchOpen(true);
            }}
            className="nav-icon"
            id="search-icon"
            src={"/search.png"}
            height="30px"
            alt="Buscar productos"
          />
        </Col>
        <Col className="d-none d-md-block">
          <Link href={"/"}>
            <a>
              <h1 className="title">
                Joyerí
                <span id="aya-text">
                  A<span className="dot">·</span>y<span className="dot">·</span>
                  A
                </span>
                ccesorios
              </h1>
              <h3 className="by-title">
                <div>by Leolandia</div>
              </h3>
            </a>
          </Link>
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
          {user == null ? (
            <Link href="/entrar-o-acceder" passHref>
              <a>
                <img
                  className={"nav-icon"}
                  id="user-icon"
                  src={"/usergirl.png"}
                  height="30px"
                  alt="Login"
                />
              </a>
            </Link>
          ) : (
            <img
              onClick={async () => {
                props.sideMenuFunc(true);
              }}
              className={user?.avatar ? "nav-icon user-nav-avatar" : "nav-icon"}
              id="user-icon"
              src={user?.avatar ? user.avatar : "/usergirl.png"}
              height="30px"
              alt="Login"
            />
          )}

          {"  "}
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
        <MenuItems itemClass="nav-item"></MenuItems>
      </Row>
    </div>
  ) : (
    <SearchBar
      closeFunc={() => {
        setSearchOpen(false);
      }}
    />
  );
};

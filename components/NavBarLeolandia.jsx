/** @format */

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import HamburguerBtn from "./HamburguerBtn";
import { MenuItems } from "./MenuItems";
import { SearchBar } from "./SearchBar";
import CartIcon from "./icons/CartIcon";
import useUser from "hooks/useUser";
import SearchIcon from "./icons/SearchIcon";

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
          <SearchIcon
            id="search-icon"
            className="nav-icon"
            width="30px"
            height="30px"
            onClick={() => {
              setSearchOpen(true);
            }}
          ></SearchIcon>
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
          <Link href={"/"}>
            <a>
              <div>
                <img
                  className="nav-icon"
                  id="logo-icon"
                  src={"/logo.png"}
                  height="50px"
                  alt="joyeria y accesorios"
                />
                <span id="aya-text">
                  A<span className="dot">·</span>y<span className="dot">·</span>
                  A
                </span>
              </div>
              <h3 className="by-title">
                <div>by Leolandia</div>
              </h3>
            </a>
          </Link>
        </Col>
        <Col className="tools-container">
          {user == null ? (
            <Link className="icon-tool" href="/entrar-o-acceder" passHref>
              <a className="icon-tool">
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
              className={
                user?.avatar
                  ? "nav-icon user-nav-avatar icon-tool"
                  : "nav-icon icon-tool"
              }
              id="user-icon"
              src={user?.avatar ? user.avatar : "/usergirl.png"}
              height="30px"
              alt="Login"
            />
          )}
          <Link className="icon-tool" href="/entrar-o-acceder" passHref>
            <a className="icon-tool">
              <CartIcon width={"30px"} height={"30px"}></CartIcon>
            </a>
          </Link>
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

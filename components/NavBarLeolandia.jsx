/** @format */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import HamburguerBtn from "./HamburguerBtn";
import { MenuItems } from "./MenuItems";
import { SearchBar } from "./SearchBar";
import CartIcon from "./icons/CartIcon";
import { useAuth } from "hooks/AuthUserProvider";

import SearchIcon from "./icons/SearchIcon";
const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);
const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export const NavBarLeolandia = (props) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { authUser, loading } = useAuth();

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
                <Image
                  className="nav-icon"
                  id="logo-icon"
                  src={"/logo.png"}
                  placeholder="blur"
                  blurDataURL={rgbDataURL(237, 181, 6)}
                  height={50}
                  width={50}
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
          {authUser == null ? (
            <Link className="icon-tool" href="/entrar-o-acceder" passHref>
              <a className="icon-tool">
                <Image
                  className={"nav-icon"}
                  id="user-icon"
                  src={"/usergirl.png"}
                  alt="Login"
                  height={30}
                  width={30}
                />
              </a>
            </Link>
          ) : (
            <Image
              onClick={async () => {
                props.sideMenuFunc(true);
              }}
              className={
                authUser?.avatar
                  ? "nav-icon user-nav-avatar icon-tool"
                  : "nav-icon icon-tool"
              }
              id="user-icon"
              src={authUser?.avatar ? authUser.avatar : "/usergirl.png"}
              height={30}
              width={30}
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

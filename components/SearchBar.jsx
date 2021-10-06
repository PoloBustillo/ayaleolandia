/** @format */
import React from "react";
import { Row } from "react-bootstrap";

export const SearchBar = (props) => {
  return (
    <Row className="search-container">
      <span>
        <input type="text" placeholder="Busca un producto" />
        <img
          onClick={() => {
            props.closeFunc();
          }}
          id="x-black"
          src={"/xBlack.png"}
          height="25px"
          alt="Close Top Bar Leolandia"
        />
      </span>
    </Row>
  );
};

/** @format */

import React from "react";
import { useState, useEffect } from "react";
import { TopMsg } from "./TopMsg";

export const TopBar = (props) => {
  const { msgs } = props;
  const [index, setIndex] = useState(0);
  const [close, setClose] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < msgs.length - 1) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [index]);

  return !close ? (
    <div className="top-bar-container">
      <a href={msgs[index].url} rel="nofollow">
        <div id="top-bar" className="border-top-bar">
          <TopMsg msg={msgs[index]}></TopMsg>
        </div>
      </a>
      <div
        className="border-top-bar"
        id="close-top-bar"
        onClick={() => {
          setClose(true);
        }}
      >
        <span className="visually-hidden">Cerrar Barra</span>
        <img
          id="x-img"
          src={"/close.png"}
          height="15px"
          alt="Close Top Bar Leolandia"
        />
      </div>
    </div>
  ) : null;
};

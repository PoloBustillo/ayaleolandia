/** @format */

import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { TopMsg } from "./TopMsg";

export const TopBar = (props) => {
  const [index, setIndex] = useState(0);
  const [close, setClose] = useState(false);
  const data = props.msgs;

  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => {
        if (index < data.length - 1) {
          setIndex(index + 1);
        } else {
          setIndex(0);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return !close && data ? (
    <div className="top-bar-container">
      <a href={data[index].url} rel="nofollow">
        <div id="top-bar" className="border-top-bar">
          <TopMsg msg={data[index]}></TopMsg>
        </div>
      </a>
      <div
        className="border-top-bar"
        id="close-top-bar"
        onClick={() => {
          setClose(true);
        }}
      >
        <Image
          id="x-img"
          src={"/close.png"}
          height={15}
          width={15}
          alt="Close Top Bar Leolandia"
        />
        <span className="visually-hidden">Cerrar Barra</span>
      </div>
    </div>
  ) : null;
};

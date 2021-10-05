/** @format */

import React from "react";
import { useState, useEffect } from "react";

export const TopBar = (props) => {
  const [index, setIndex] = useState(0);
  const [close, setClose] = useState(false);

  useEffect(() => {
    console.log(index);
    const timer = setTimeout(() => {
      if (index < props.children.length - 1) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }, 500000);
    return () => clearTimeout(timer);
  }, [index]);

  return !close ? (
    <div>
      <div id="top-bar" className="border-top-bar" key={index}>
        {props.children[index]}
      </div>
      <div
        className="border-top-bar"
        id="close-top-bar"
        onClick={() => {
          setClose(true);
        }}
      >
        <img
          id="x-img"
          src={"/x.png"}
          height="15px"
          alt="Close Top Bar Leolandia"
        />
      </div>
    </div>
  ) : null;
};

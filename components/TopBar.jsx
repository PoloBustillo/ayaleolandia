/** @format */

import React from "react";
import { useState, useEffect } from "react";

export const TopBar = (props) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    console.log(index);
    const timer = setTimeout(() => {
      if (index < props.children.length - 1) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div id="top-bar" key={index}>
      {props.children[index]}
    </div>
  );
};

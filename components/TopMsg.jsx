/** @format */

import React from "react";
import Image from "next/image";

export const TopMsg = (props) => {
  const { text, icon, subText } = props.msg;
  return (
    <div>
      <span id={"top-bar-text"}>{text}</span>
      {subText != undefined ? (
        <span id={"top-bar-sub-text"}>{" | " + subText + " | "}</span>
      ) : null}
      {icon != undefined ? (
        <span className="span-img">
          <img src={icon} height="30px" alt="Whatsapp Leolandia" />
        </span>
      ) : null}
    </div>
  );
};

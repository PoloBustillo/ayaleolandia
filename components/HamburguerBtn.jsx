/** @format */

import React from "react";

export default function HamburguerBtn(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className={props.sideMenuStatus ? "menu-btn open" : "menu-btn"}
      onClick={() => {
        setOpen(true);
        props.sideMenuFunc(true);
      }}
    >
      <div className="menu-btn__burger"></div>
    </div>
  );
}

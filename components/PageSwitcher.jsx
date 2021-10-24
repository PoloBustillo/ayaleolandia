/** @format */

import React from "react";

export const PageSwitcher = ({ firstSelected, updateScreen }) => {
  return (
    <div className="pageSwitcher">
      <span
        onClick={() => {
          updateScreen(true);
        }}
        className={
          firstSelected ? "selected pageSwitcherItem" : "pageSwitcherItem"
        }
      >
        Entrar Cuenta
      </span>
      <span
        aria-current="page"
        onClick={() => {
          updateScreen(false);
        }}
        className={
          !firstSelected ? "selected pageSwitcherItem" : "pageSwitcherItem"
        }
      >
        Crear Cuenta
      </span>
    </div>
  );
};

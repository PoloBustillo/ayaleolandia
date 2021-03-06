/** @format */

import React from "react";
import { bubble as Menu } from "react-burger-menu";
import { SideAvatar } from "./SideAvatar";
import { SideItems } from "./SideItems";
import { SideOrders } from "./SideOrders";

export const SideMenu = (props) => {
  return (
    <Menu
      isOpen={props.sideMenuStatus}
      onClose={() => {
        props.sideMenuFunc(false);
      }}
    >
      <SideAvatar sideMenuFunc={props.sideMenuFunc}></SideAvatar>
      <SideItems></SideItems>
      <SideOrders></SideOrders>
    </Menu>
  );
};

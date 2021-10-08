/** @format */

import React from "react";

import { SideOrder } from "./SideOrder";

export const SideOrders = () => {
  return (
    <div className="container-avatar">
      <span className="title-orders">
        Ordenes <span className="order-date">Ver todas</span>
      </span>

      <SideOrder></SideOrder>
      <SideOrder></SideOrder>
      <SideOrder></SideOrder>
    </div>
  );
};

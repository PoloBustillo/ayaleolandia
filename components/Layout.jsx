/** @format */

import React from "react";
import { SideMenu } from "./SideMenu";
import { Footer } from "./Footer";
import { TopBar } from "./TopBar";
import { NavBarLeolandia } from "./NavBarLeolandia";
import Headroom from "react-headroom";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

let msgs = [
  {
    text: "Pedidos en Whatsapp",
    subText: "manda mensaje Aqui 331·7·00·33·9",
    icon: "/whatsappWhite.png",
    url: "https://api.whatsapp.com/send/?phone=5212225503494&text=Hola+me+gustar%C3%ADa+pedir+informes+de ",
  },
  {
    text: "Rifas y sorteos",
    subText: "Al comprar $200",
    icon: "/win.png",
    url: "/rifasysorteos",
  },
];

export const Layout = (props) => {
  const { data, error } = useSWR(
    "https://ayaleolandia.vercel.app/api/top-bar-msgs",
    fetcher
  );
  const [sideMenuStatus, setSideMenuStatus] = useState(false);
  console.log(data);
  console.log(error);
  return (
    <>
      <SideMenu
        sideMenuStatus={sideMenuStatus}
        sideMenuFunc={setSideMenuStatus}
      ></SideMenu>
      <TopBar msgs={data} />
      <main className="main">
        <Headroom>
          <NavBarLeolandia
            selected={0}
            sideMenuStatus={sideMenuStatus}
            sideMenuFunc={setSideMenuStatus}
          ></NavBarLeolandia>
        </Headroom>
        {props.children}
      </main>
      <Footer></Footer>
    </>
  );
};

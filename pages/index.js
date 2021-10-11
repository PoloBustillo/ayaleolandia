/** @format */

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { TopBar } from "../components/TopBar";
import { NavBarLeolandia } from "../components/NavBarLeolandia";
import Headroom from "react-headroom";
import { SideMenu } from "../components/SideMenu";
import { useState } from "react";
import Deck from "../components/Deck";

export default function Home() {
  const [sideMenuStatus, setSideMenuStatus] = useState(false);

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

  return (
    <div>
      <SideMenu
        sideMenuStatus={sideMenuStatus}
        sideMenuFunc={setSideMenuStatus}
      ></SideMenu>
      <TopBar msgs={msgs} />
      <Head>
        <title>Joyería y accesorios</title>
        <meta
          name="description"
          content="Leolandia accesorios y joyeria al mejor precio"
        />
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <Headroom>
          <NavBarLeolandia
            selected={0}
            sideMenuStatus={sideMenuStatus}
            sideMenuFunc={setSideMenuStatus}
          ></NavBarLeolandia>
        </Headroom>
        <div>
          <div id="root">
            <Deck></Deck>
            {/* <video
            playsInline
            muted
            autoPlay
            loop
            poster="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/polina.jpg"
            id="bgvid"
          >
            <source
              src="https://video.wixstatic.com/video/ea26fd_a7989f56a9704ec0b40cff680647b589/1080p/mp4/file.mp4"
              type="video/webm"
            />
            <source
              src="https://video.wixstatic.com/video/ea26fd_a7989f56a9704ec0b40cff680647b589/1080p/mp4/file.mp4"
              type="video/mp4"
            />
          </video> */}
          </div>
        </div>
        <div style={{ height: "1700px" }}>
          <span>OTRA SECCION</span>
        </div>
      </main>

      <footer className={styles.footer}>
        Powered by <span className={styles.logo}>Takito Corp</span>
      </footer>
    </div>
  );
}
export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

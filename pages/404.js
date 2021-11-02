/** @format */

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Custom404() {
  const [counter, setCounter] = useState(5);
  const Router = useRouter();
  useEffect(() => {
    if (counter == 0) {
      Router.push("/");
    }
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  return (
    <>
      <Head>
        <title>Joyería y accesorios</title>
        <meta
          name="description"
          content="Leolandia accesorios y joyeria al mejor precio"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="notfoud-container loading-container">
        <h1>Sitio no encontrado</h1>
        <h3>{`Moviendonos a Home en... ${counter}`}</h3>
      </div>
    </>
  );
}

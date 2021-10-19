/** @format */

import Head from "next/head";
import Deck from "components/Deck";
import { Layout } from "components/Layout";
import { useState, useEffect } from "react";
import { DropDownFilter } from "components/DropDownFilter";
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <div>
      <Head>
        <title>Joyería y accesorios</title>
        <meta
          name="description"
          content="Leolandia accesorios y joyeria al mejor precio"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Layout>
        <div style={{ height: "1700px" }}>
          <div className="title-section">Productos</div>
          <DropDownFilter></DropDownFilter>
          <AnimateSharedLayout>
            <motion.ul layout>
              {products.map((item) => (
                <span>ITEM</span>
              ))}
            </motion.ul>
          </AnimateSharedLayout>
          {products.map((product) => {
            return <div>{product.id}</div>;
          })}
        </div>
        <div id="root">
          <div className="title-new ">Nuevos Productos</div>
          <Deck></Deck>
          <video
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
          </video>
        </div>
      </Layout>
    </div>
  );
}
export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

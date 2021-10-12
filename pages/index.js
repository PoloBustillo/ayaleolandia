/** @format */

import Head from "next/head";
import Deck from "../components/Deck";
import { Layout } from "../components/Layout";
import { ProductCards } from "../components/ProductCards";

export default function Home() {
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
        <div style={{ height: "1700px" }}>
          <span>OTRA SECCION</span>
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

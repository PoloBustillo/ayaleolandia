/** @format */

import Head from "next/head";
import Deck from "components/Deck";
import { useState, useEffect } from "react";
import { DropDownFilter } from "components/DropDownFilter";
import { Row, Col, Card } from "react-bootstrap";
import { fetchGet } from "utils/methods";
import { Layout } from "components/Layout";
import { TopBar } from "components/TopBar";
import { logError } from "utils/logger";
import Title from "components/atoms/Title.tsx";
import { height } from "dom-helpers";

export default function Home(props) {
  const [products, setProducts] = useState([]);

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
      <TopBar msgs={props.topMsgs} />
      <Layout>
        <div>
          <Row className="products-container">
            <Col>
              <DropDownFilter></DropDownFilter>
            </Col>
            <Col>
              <span className="title-products">Productos</span>
            </Col>
          </Row>
          <Row className="product-row g-3">
            {products.map((product) => {
              return (
                <Col key={product.id}>
                  <Card>
                    <Card.Img variant="top" src="" />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{product.shortDescription}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
        <div className="new-products-container">
          <div className="title-new ">Nuevos Productos</div>
          {/* <video playsInline muted autoPlay loop poster="" id="bgvid">
              <source
                src="https://video.wixstatic.com/video/ea26fd_a7989f56a9704ec0b40cff680647b589/1080p/mp4/file.mp4"
                type="video/webm"
              />
              <source
                src="https://video.wixstatic.com/video/ea26fd_a7989f56a9704ec0b40cff680647b589/1080p/mp4/file.mp4"
                type="video/mp4"
              />
            </video> */}
          <Title
            text="Hola"
            image={{ src: "/usergirl.png", width: 20, height: 20 }}
          ></Title>
          <div id="new-products">
            <Deck></Deck>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getStaticProps(context) {
  let topBarMsgs = null;

  try {
    topBarMsgs = await fetchGet("/api/top-bar-msgs");
  } catch (error) {
    logError("TopBar failing", getStaticProps.name, {});
  }

  if (!topBarMsgs) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      topMsgs: topBarMsgs,
    },
    revalidate: 10,
  };
}

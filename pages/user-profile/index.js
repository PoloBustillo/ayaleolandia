/** @format */

import Head from "next/head";
import { useState, useRef } from "react";
import Link from "next/link";
import { useAuth } from "hooks/AuthUserProvider";
import { UpdateProfile } from "components/UpdateProfile";

import { ButtonLoader } from "components/ButtonLoader";
import { Row, Col, Form, Accordion, Alert } from "react-bootstrap";

import { Layout } from "components/Layout";
import withAuth from "components/HOC/withAuth";
import { updateUser } from "configs/client/firebase";

function UserProfile({ fallback }) {
  const { authUser, loading, setAuthUser } = useAuth();

  const inputFile = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const [file, setFile] = useState({});
  const [avatar, setAvatar] = useState(null);

  const handleFieldChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleFileSelected = (e) => {
    const files = Array.from(e.target.files);
    try {
      setAvatar(URL.createObjectURL(files[0]));
      setFile(files[0]);
    } catch (error) {}
  };

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
        <div className="settings-page">
          <div className="settings-container">
            {showAlert && (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Lo sentimos, hubo un error en tu petición!
                </Alert.Heading>
                <p>{alertMsg}</p>
              </Alert>
            )}
            <Row>
              <h2 className="settings-title">Administra tu cuenta</h2>
              <Accordion flush className="accordion-container">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Información de la cuenta</Accordion.Header>
                  <Accordion.Body>
                    <UpdateProfile></UpdateProfile>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Dirrecciones de envios </Accordion.Header>
                  <Accordion.Body>
                    <div>Dirrecciones de envios +</div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Información de pagos</Accordion.Header>
                  <Accordion.Body>
                    <div>Dirreccion de Facturación</div>
                    <div>Tarjetas Guardadas</div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Ordenes</Accordion.Header>
                  <Accordion.Body></Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <ButtonLoader
                clickFunc={async () => {
                  console.log("UPDATE_USER:" + authUser);
                  updateUser(authUser.id, { username: "newUser" });
                }}
                onMouseUpFunc={() => {
                  console.log("onMouseUpFunc");
                }}
                block
                size="lg"
                type="submit"
                className="login-email"
              >
                Guardar
              </ButtonLoader>
            </Row>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default withAuth(UserProfile);

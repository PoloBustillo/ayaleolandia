/** @format */

import Head from "next/head";
import { useState, useRef } from "react";
import Link from "next/link";
import { SWRConfig } from "swr";

import { fetchGet } from "utils/methods";
import { useAuth } from "hooks/AuthUserProvider";

import { ButtonLoader } from "components/ButtonLoader";
import { Row, Col, Form, Accordion, Alert } from "react-bootstrap";

import { Layout } from "components/Layout";
import withAuth from "components/HOC/withAuth";
import { refreshUser, updateUser } from "configs/client/firebase";

function UserProfile({ fallback }) {
  const { authUser, loading } = useAuth();
  const inputFile = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const [file, setFile] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [formState, setFormState] = useState(authUser);
  console.log(authUser);
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
      <SWRConfig value={{ fallback }}>
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
                    <Accordion.Header>
                      Información de la cuenta
                    </Accordion.Header>
                    <Accordion.Body>
                      <Form>
                        <Row
                          onClick={() => {
                            inputFile.current.click();
                          }}
                        >
                          <Col className="container-upload">
                            <div className="avatar-form">
                              <img
                                src={
                                  avatar
                                    ? avatar
                                    : authUser.avatar
                                    ? authUser.avatar
                                    : "usergirl.png"
                                }
                                alt="user avatar"
                              />
                            </div>
                          </Col>
                          <Col className="container-upload">
                            <Form.Group
                              controlId="formFile"
                              className="avatar-upload"
                            >
                              <img
                                width="30px"
                                src={"upload_file.png"}
                                alt="file upload"
                              />
                              <Form.Control
                                onChange={handleFileSelected}
                                ref={inputFile}
                                className="avatar-file-input"
                                type="file"
                                accept="image/*"
                              />
                            </Form.Group>
                            <span className="avatar-label">
                              {file?.name ? file.name : "Seleccciona Imagen"}
                            </span>
                          </Col>
                        </Row>
                        <Form.Floating required className="mb-3">
                          <Form.Control
                            id="floatingNameInput"
                            className={"is-valid input-settings"}
                            type="text"
                            name="name"
                            value={formState.name ? formState.name : ""}
                            onChange={(e) => {
                              handleFieldChange(e);
                            }}
                          />
                          <label htmlFor="floatingInputCustom">Nombre</label>
                        </Form.Floating>
                        <Row>
                          <Col>
                            <Form.Floating required className="mb-3">
                              <Form.Control
                                id="floatingNameInput"
                                className={"is-valid input-settings"}
                                type="text"
                                name="username"
                                value={
                                  formState.username ? formState.username : ""
                                }
                                onChange={(e) => {
                                  handleFieldChange(e);
                                }}
                              />
                              <label htmlFor="floatingInputCustom">
                                Nickname
                              </label>
                            </Form.Floating>
                          </Col>
                          <Col>
                            <Form.Floating className="mb-3">
                              <Form.Control
                                className={"is-valid input-settings"}
                                id="floatingPhoneCustom"
                                type="phone"
                                name="phoneNumber"
                                value={
                                  formState.phoneNumber
                                    ? formState.phoneNumber
                                    : ""
                                }
                                onChange={(e) => {
                                  handleFieldChange(e);
                                }}
                              />

                              <label htmlFor="floatingPhoneCustom">
                                Teléfono
                              </label>
                            </Form.Floating>
                          </Col>
                        </Row>

                        <Form.Floating className="mb-3">
                          <Form.Control
                            className={"is-valid input-settings"}
                            id="floatingInputCustom"
                            type="email"
                            name="email"
                            value={formState.email ? formState.email : ""}
                            onChange={(e) => {
                              handleFieldChange(e);
                            }}
                          />

                          <label htmlFor="floatingInputCustom">Email</label>
                        </Form.Floating>
                        <>
                          <Form.Check
                            readOnly
                            checked={
                              formState.emailVerified
                                ? formState.emailVerified
                                : false
                            }
                            type="switch"
                            className="form-settings"
                            id="terminos-switch"
                            label={
                              <span>
                                Email verificado{" "}
                                {!formState.emailVerified && (
                                  <Link href={"/terminos-y-condiciones"}>
                                    <a>Verificar Email</a>
                                  </Link>
                                )}
                              </span>
                            }
                          ></Form.Check>

                          <Form.Check
                            checked={formState.pushNotification}
                            onChange={() => {
                              setFormState({
                                ...formState,
                                pushNotification: !formState.pushNotification,
                              });
                            }}
                            className="form-settings"
                            type="switch"
                            id="terminos-switch"
                            label={<span>Recibir notificaciones</span>}
                          ></Form.Check>
                          <Form.Check
                            checked={formState.subscription}
                            onChange={() => {
                              setFormState({
                                ...formState,
                                subscription: !formState.subscription,
                              });
                            }}
                            className="form-settings"
                            type="switch"
                            id="terminos-switch"
                            label={<span>Subscripción</span>}
                          ></Form.Check>
                        </>
                      </Form>
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
                    console.log(authUser);
                    updateUser(authUser.id, { username: "newUser" });
                    refreshUser();
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
      </SWRConfig>
    </div>
  );
}

export default withAuth(UserProfile);

export async function getStaticProps(context) {
  // `getStaticProps` is executed on the server side.
  const topBarMsgs = await fetchGet("/api/top-bar-msgs");

  return {
    props: {
      fallback: {
        "/api/top-bar-msgs": topBarMsgs,
      },
    },
  };
}

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

function UserProfile({ fallback }) {
  const { authUser, loading } = useAuth();
  const inputFile = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const [file, setFile] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [formState, setFormState] = useState({});

  const handleFieldChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleFileSelected = (e) => {
    const files = Array.from(e.target.files);
    let reader = new FileReader();
    setAvatar(URL.createObjectURL(files[0]));
    setFile(files[0]);
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
                      <Form
                        onSubmit={() => {
                          console.log("Hola");
                        }}
                      >
                        <>
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
                                <Form.Label>
                                  <img
                                    width="30px"
                                    src={"upload_file.png"}
                                    alt="file upload"
                                  />
                                </Form.Label>
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
                              className={"is-valid"}
                              type="text"
                              name="name"
                              onChange={(e) => {
                                handleFieldChange(e);
                              }}
                            />
                            <Form.Control.Feedback>
                              Se ve bien!
                            </Form.Control.Feedback>

                            <label htmlFor="floatingInputCustom">Nombre</label>
                          </Form.Floating>

                          <Form.Floating className="mb-3">
                            <Form.Control
                              className={"is-valid"}
                              id="floatingPhoneCustom"
                              type="phone"
                              name="phone"
                              onChange={(e) => {
                                handleFieldChange(e);
                              }}
                            />
                            <Form.Control.Feedback>
                              Se ve bien!
                            </Form.Control.Feedback>

                            <label htmlFor="floatingPhoneCustom">
                              Teléfono
                            </label>
                          </Form.Floating>
                        </>

                        <Form.Floating className="mb-3">
                          <Form.Control
                            className={"is-valid"}
                            id="floatingInputCustom"
                            type="email"
                            name="email"
                            onChange={(e) => {
                              handleFieldChange(e);
                            }}
                          />

                          <label htmlFor="floatingInputCustom">Email</label>
                        </Form.Floating>
                        <Form.Floating>
                          <Form.Control
                            className={"is-valid"}
                            id="floatingPasswordCustom"
                            type="password"
                            name="password"
                            onChange={(e) => {
                              handleFieldChange(e);
                            }}
                          />
                          <>
                            <Form.Control.Feedback>
                              Se ve bien!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Errror
                            </Form.Control.Feedback>
                          </>
                          <label htmlFor="floatingPasswordCustom">
                            Contraseña
                          </label>
                        </Form.Floating>
                        <>
                          <Form.Check
                            checked={true}
                            onChange={() => {
                              console.log("CHECKL");
                            }}
                            type="switch"
                            id="terminos-switch"
                            label={
                              <span>
                                Acepto{" "}
                                <Link href={"/terminos-y-condiciones"}>
                                  <a>Terminos y Condiciones</a>
                                </Link>
                              </span>
                            }
                            className={"is-valid"}
                          ></Form.Check>
                          <Form.Control.Feedback>
                            Se ve bien!
                          </Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                            Error
                          </Form.Control.Feedback>
                        </>
                      </Form>

                      <ButtonLoader
                        clickFunc={async () => {
                          console.log("HOLA");
                        }}
                        onMouseUpFunc={() => {
                          console.log("lol");
                        }}
                        block
                        size="lg"
                        type="submit"
                        className="login-email"
                      >
                        Ingresar
                      </ButtonLoader>

                      <Col className="login-btn" xs={12} sm={6} md={12} lg={6}>
                        <ButtonLoader
                          clickFunc={async () => {
                            console.log("HOLA");
                          }}
                          block
                          size="lg"
                          type="submit"
                          className="login-facebook"
                        >
                          Button
                        </ButtonLoader>
                      </Col>
                      <Col className="login-btn" xs={12} sm={6} md={12} lg={6}>
                        <ButtonLoader
                          clickFunc={async () => {
                            console.log("BUITTON");
                          }}
                          block
                          size="lg"
                          type="submit"
                          className="login-google"
                        >
                          Otro
                        </ButtonLoader>
                      </Col>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Dirrecciones</Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Información de pagos</Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Ordenes</Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
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

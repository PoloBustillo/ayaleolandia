/** @format */

import Head from "next/head";
import Link from "next/link";
import { Layout } from "components/Layout";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { loginWith } from "configs/firebase";
import { useRouter } from "next/router";
import useUser from "hooks/useUser";
import FacebookIcon from "components/icons/FacebookIcon";
import GoogleIcon from "components/icons/GoogleIcon";

export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loginScreen, setLoginScreen] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [password, setPassword] = useState("");
  const user = useUser();
  const router = useRouter();

  function validateForm() {
    let lenValid = email.length > 0 && password.length > 0;
    if (!loginScreen) return checkboxChecked;
    if (loginScreen) return true;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

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
        <div className="pageSwitcher">
          <span
            onClick={() => {
              setLoginScreen(true);
            }}
            className={
              loginScreen ? "selected pageSwitcherItem" : "pageSwitcherItem"
            }
          >
            Entrar Cuenta
          </span>
          <span
            aria-current="page"
            onClick={() => {
              setLoginScreen(false);
            }}
            className={
              !loginScreen ? "selected pageSwitcherItem" : "pageSwitcherItem"
            }
          >
            Crear Cuenta
          </span>
        </div>
        <div className="login-page">
          <div className="login-container">
            <>
              {!loginScreen && (
                <>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="floatingInputCustom"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="floatingInputCustom">Nombre</label>
                  </Form.Floating>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="floatingPasswordCustom"
                      type="phone"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <label htmlFor="floatingPasswordCustom">Teléfono</label>
                  </Form.Floating>
                </>
              )}
              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingInputCustom"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInputCustom">Email</label>
              </Form.Floating>
              <Form.Floating>
                <Form.Control
                  id="floatingPasswordCustom"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPasswordCustom">Contraseña</label>
              </Form.Floating>
            </>
            <span className="forgot-password">Olvide mi contraseña</span>
            {!loginScreen && (
              <Form.Check
                checked={checkboxChecked}
                onChange={() => {
                  setCheckboxChecked(!checkboxChecked);
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
              ></Form.Check>
            )}
            <Button
              onClick={async () => {
                await loginWith("email", email, password);
              }}
              block
              size="lg"
              type="submit"
              className="login-email"
              disabled={!validateForm()}
            >
              Iniciar Sesión
            </Button>
            {loginScreen && (
              <Row>
                <Col className="login-btn" xs={12} sm={6} md={12} lg={6}>
                  <Button
                    onClick={async () => {
                      await loginWith("facebook");
                    }}
                    block
                    size="lg"
                    type="submit"
                    className="login-facebook"
                    disabled={!validateForm()}
                  >
                    <FacebookIcon className="facebook-icon"></FacebookIcon>
                    {"  "}
                    Facebook
                  </Button>
                </Col>
                <Col className="login-btn" xs={12} sm={6} md={12} lg={6}>
                  <Button
                    onClick={async () => {
                      await loginWith("google");
                    }}
                    block
                    size="lg"
                    type="submit"
                    className="login-google"
                    disabled={!validateForm()}
                  >
                    <GoogleIcon className="facebook-icon"></GoogleIcon>
                    {"  "}
                    Google
                  </Button>
                </Col>
                <span className={"advice"}>
                  Al iniciar con redes sociales aceptas terminos y condiciones
                </span>
              </Row>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}

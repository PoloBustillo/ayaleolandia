/** @format */

import Head from "next/head";
import Link from "next/link";
import { Layout } from "components/Layout";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useSpring, animated } from "@react-spring/web";
import { useState, useEffect } from "react";
import {
  loginWith,
  createAccountWith,
  resetPasswordByEmail,
} from "configs/firebase";
import { useRouter } from "next/router";
import { validateFormData, hasError, errorFirebaseMap } from "utils/methods";
import useUser from "hooks/useUser";
import FacebookIcon from "components/icons/FacebookIcon";
import GoogleIcon from "components/icons/GoogleIcon";
import Loader from "components/Loader";

export default function Login() {
  const styles = useSpring({
    loop: { reverse: true },
    config: { duration: "500", mass: 1, tension: 210, friction: 20 },
    from: { width: "50vw", opacity: 0.7, color: "deeppink", scale: 1.5, x: 50 },
    to: [
      { width: "50vw", opacity: 1, color: "black", scale: 1.2, x: 30 },
      { width: "50vw", opacity: 1, color: "red", scale: 1, x: 0 },
    ],
  });

  const [validationMap, setValidationMap] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [show, setShow] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [loginScreen, setLoginScreen] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const user = useUser();
  const router = useRouter();
  const [state, setState] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    // Show loader a bits longer to avoid loading flash
    if (showLoader) {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 400);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showLoader]);

  useEffect(() => {
    if (triggerAnimation) {
      setTriggerAnimation(false);
    }
    const { name, phone, email, password } = state;
    if (user) {
      router.push("/");
    }
    let validation = validateFormData(loginScreen, {
      check: checkboxChecked,
      nombre: name,
      phone,
      email,
      password,
    });
    let validationMap = validation.validationMsgs.reduce(function (map, obj) {
      map[obj.trigger] = obj;
      return map;
    }, {});
    setValidationMap(validationMap);
  }, [state, user, loginScreen, checkboxChecked]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  const handleFieldChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
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
            {show && (
              <Alert
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
              >
                <Alert.Heading>
                  Lo sentimos, hubo un error en tu petición!
                </Alert.Heading>
                <p>{alertMsg}</p>
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              {!loginScreen && (
                <>
                  <Form.Floating required className="mb-3">
                    <Form.Control
                      id="floatingNameInput"
                      className={
                        validationMap.name?.type == "error"
                          ? "is-invalid"
                          : "is-valid"
                      }
                      type="text"
                      name="name"
                      value={state.name}
                      onChange={(e) => {
                        handleFieldChange(e);
                      }}
                    />
                    <Form.Control.Feedback>Se ve bien!</Form.Control.Feedback>
                    <animated.div style={triggerAnimation ? styles : {}}>
                      <Form.Control.Feedback type="invalid">
                        {validationMap.name?.msg}
                      </Form.Control.Feedback>
                    </animated.div>
                    <label htmlFor="floatingInputCustom">Nombre</label>
                  </Form.Floating>

                  <Form.Floating className="mb-3">
                    <Form.Control
                      className={
                        validationMap.phone?.type == "error"
                          ? "is-invalid"
                          : "is-valid"
                      }
                      id="floatingPhoneCustom"
                      type="phone"
                      name="phone"
                      onChange={(e) => {
                        handleFieldChange(e);
                      }}
                    />
                    <Form.Control.Feedback>Se ve bien!</Form.Control.Feedback>
                    <animated.div style={triggerAnimation ? styles : {}}>
                      <Form.Control.Feedback type="invalid">
                        {validationMap.phone?.msg}
                      </Form.Control.Feedback>
                    </animated.div>
                    <label htmlFor="floatingPhoneCustom">Teléfono</label>
                  </Form.Floating>
                </>
              )}
              <Form.Floating className="mb-3">
                <Form.Control
                  className={
                    validationMap.email?.type == "error"
                      ? "is-invalid"
                      : "is-valid"
                  }
                  id="floatingInputCustom"
                  type="email"
                  name="email"
                  onChange={(e) => {
                    handleFieldChange(e);
                  }}
                />
                <>
                  {!loginScreen && (
                    <Form.Control.Feedback>Se ve bien!</Form.Control.Feedback>
                  )}
                  <animated.div style={triggerAnimation ? styles : {}}>
                    <Form.Control.Feedback type="invalid">
                      {validationMap.email?.msg}
                    </Form.Control.Feedback>
                  </animated.div>
                </>
                <label htmlFor="floatingInputCustom">Email</label>
              </Form.Floating>
              <Form.Floating>
                <Form.Control
                  className={
                    validationMap.password?.type == "warning"
                      ? "is-invalid"
                      : validationMap.password?.type == "error"
                      ? "is-invalid"
                      : "is-valid"
                  }
                  id="floatingPasswordCustom"
                  type="password"
                  name="password"
                  onChange={(e) => {
                    handleFieldChange(e);
                  }}
                />
                <>
                  {!loginScreen && (
                    <Form.Control.Feedback>Se ve bien!</Form.Control.Feedback>
                  )}
                  <Form.Control.Feedback type="invalid">
                    {validationMap.password?.msg}
                  </Form.Control.Feedback>
                </>
                <label htmlFor="floatingPasswordCustom">Contraseña</label>
              </Form.Floating>
            </Form>
            {loginScreen && (
              <span
                onClick={() => {
                  resetPasswordByEmail(state.email);
                }}
                className="forgot-password"
              >
                Olvide mi contraseña
              </span>
            )}
            {!loginScreen && (
              <>
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
                  className={
                    validationMap.check?.type == "error"
                      ? "is-invalid"
                      : "is-valid"
                  }
                ></Form.Check>
                <Form.Control.Feedback>Se ve bien!</Form.Control.Feedback>
                <animated.div style={triggerAnimation ? styles : {}}>
                  <Form.Control.Feedback type="invalid">
                    {validationMap.check?.msg}
                  </Form.Control.Feedback>
                </animated.div>
              </>
            )}

            <Button
              onClick={async () => {
                if (!hasError(validationMap, "type", "error")) {
                  setShowLoader(true);
                  //Add loading to button
                  if (loginScreen) {
                    try {
                      await loginWith("email", state.email, state.password);
                      setShowLoader(false);
                    } catch (error) {
                      console.log(error.code);
                      setShow(true);
                      setAlertMsg(errorFirebaseMap.get(error.code));
                    }
                  } else {
                    try {
                      await createAccountWith(
                        "email",
                        state.email,
                        state.password
                      );
                      setShowLoader(false);
                    } catch (error) {
                      setShow(true);
                      setAlertMsg(errorFirebaseMap.get(error.code));
                    }
                  }
                } else {
                  setTriggerAnimation(true);
                }
              }}
              onMouseUp={() => {
                setTriggerAnimation(false);
              }}
              block
              size="lg"
              type="submit"
              className="login-email"
            >
              {showLoader ? <Loader /> : "Ingresar"}
            </Button>

            <Row>
              <Col className="login-btn" xs={12} sm={6} md={12} lg={6}>
                <Button
                  onClick={async () => {
                    try {
                      await loginWith("facebook");
                    } catch (error) {
                      setShow(true);
                      setAlertMsg(errorFirebaseMap.get(error.code));
                    }
                  }}
                  block
                  size="lg"
                  type="submit"
                  className="login-facebook"
                >
                  <FacebookIcon className="facebook-icon"></FacebookIcon>
                  {"  "}
                  Facebook
                </Button>
              </Col>
              <Col className="login-btn" xs={12} sm={6} md={12} lg={6}>
                <Button
                  onClick={async () => {
                    try {
                      await loginWith("google");
                    } catch (error) {
                      setShow(true);
                      setAlertMsg(errorFirebaseMap.get(error.code));
                    }
                  }}
                  block
                  size="lg"
                  type="submit"
                  className="login-google"
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
          </div>
        </div>
      </Layout>
    </div>
  );
}

/** @format */

import Head from "next/head";
import Link from "next/link";
import { Layout } from "components/Layout";
import { Logtail } from "@logtail/browser";
import { Form, Row, Col, Alert, Toast, ToastContainer } from "react-bootstrap";
import { useSpring, animated } from "@react-spring/web";
import { useState, useEffect } from "react";
import {
  loginWith,
  createAccountWith,
  resetPasswordByEmail,
} from "configs/client/firebase";
import { useRouter } from "next/router";
import {
  validateFormData,
  hasError,
  errorFirebaseMap,
  fetchGet,
} from "utils/methods";
import FacebookIcon from "components/icons/FacebookIcon";
import GoogleIcon from "components/icons/GoogleIcon";
import { ButtonLoader } from "components/ButtonLoader";
import { PageSwitcher } from "components/PageSwitcher";
import { useAuth } from "hooks/AuthUserProvider";
const logtail = new Logtail("46f2YDT9azLZ21YpgxK3uCJJ");

export default function Login({ fallback }) {
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
  const [showEmail, setShowEmail] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [loginScreen, setLoginScreen] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const { authUser } = useAuth();

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
    if (authUser) {
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
  }, [state, authUser, loginScreen, checkboxChecked]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  const handleFieldChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmitEmail = async () => {
    if (!hasError(validationMap, "type", "error")) {
      //Add loading to button
      if (loginScreen) {
        try {
          await loginWith("email", state.email, state.password);
        } catch (error) {
          console.log(error);
          setShow(true);
          setAlertMsg(errorFirebaseMap.get(error.code));
        }
      } else {
        try {
          await createAccountWith(state);
          logtail.info(`Cuenta creada con email ${state.email}`);
        } catch (error) {
          console.log(error);
          setShow(true);
          setAlertMsg(errorFirebaseMap.get(error.code));
        }
      }
    } else {
      setTriggerAnimation(true);
    }
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
      <div>
        <Layout>
          <PageSwitcher
            firstSelected={loginScreen}
            updateScreen={setLoginScreen}
          ></PageSwitcher>
          <div className="login-page">
            <div className="login-container">
              {show && (
                <ToastContainer className="p-3" position="bottom-center">
                  <Toast
                    onClose={() => setShow(false)}
                    show={show}
                    delay={5000}
                    bg="danger"
                    autohide
                  >
                    <Toast.Header>
                      <strong className="me-auto">
                        Lo sentimos, hubo un error en tu petición!
                      </strong>
                    </Toast.Header>
                    <Toast.Body>{alertMsg}</Toast.Body>
                  </Toast>
                </ToastContainer>
              )}
              {showEmail && (
                <ToastContainer className="p-3" position="bottom-center">
                  <Toast
                    onClose={() => setShowEmail(false)}
                    show={showEmail}
                    delay={5000}
                    bg="info"
                    autohide
                  >
                    <Toast.Header>
                      <strong className="me-auto">
                        {`Email fue mandado a ${state.email}`}
                      </strong>
                    </Toast.Header>
                    <Toast.Body>para cambiar su contraseña</Toast.Body>
                  </Toast>
                </ToastContainer>
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
                    {!validationMap.password?.msg.includes(
                      "Contraseña debil"
                    ) ? (
                      <animated.div style={triggerAnimation ? styles : {}}>
                        <Form.Control.Feedback type="invalid">
                          {validationMap.password?.msg}
                        </Form.Control.Feedback>
                      </animated.div>
                    ) : (
                      <Form.Control.Feedback type="invalid">
                        {validationMap.password?.msg}
                      </Form.Control.Feedback>
                    )}
                  </>
                  <label htmlFor="floatingPasswordCustom">Contraseña</label>
                </Form.Floating>
              </Form>
              {loginScreen && (
                <div
                  onClick={() => {
                    resetPasswordByEmail(
                      state.email,
                      () => {
                        setShowEmail(true);
                      },
                      (msg) => {
                        setShow(true);
                        setAlertMsg(errorFirebaseMap.get(msg));
                      }
                    );
                  }}
                  className="forgot-password"
                >
                  Olvide mi contraseña
                </div>
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
              <ButtonLoader
                clickFunc={handleSubmitEmail}
                onMouseUpFunc={() => {
                  setTriggerAnimation(false);
                }}
                block
                size="lg"
                type="submit"
                className="login-email"
              >
                {loginScreen ? "Ingresar" : "Crear"}
              </ButtonLoader>
              <Row>
                <Col className="login-btn" xs={12} sm={6} md={12} lg={6}>
                  <ButtonLoader
                    clickFunc={async () => {
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
                  </ButtonLoader>
                </Col>
                <Col className="login-btn" xs={12} sm={6} md={12} lg={6}>
                  <ButtonLoader
                    clickFunc={async () => {
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
                  </ButtonLoader>
                </Col>
                <span className={"advice"}>
                  Al iniciar con redes sociales aceptas terminos y condiciones
                </span>
              </Row>
            </div>
          </div>
        </Layout>
      </div>
    </div>
  );
}

/** @format */

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Form, Col, Row } from "react-bootstrap";
import { useAuth } from "hooks/AuthUserProvider";

export const UpdateProfile = () => {
  const { authUser, loading, setAuthUser } = useAuth();
  console.log(authUser);

  const inputFile = useRef(null);
  const [file, setFile] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [formState, setFormState] = useState(authUser);

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
    <Form>
      <Row
        onClick={() => {
          inputFile.current.click();
        }}
      >
        <Col className="container-upload">
          <div className="avatar-form">
            <Image
              src={
                avatar
                  ? avatar
                  : authUser.avatar
                  ? authUser.avatar
                  : "/usergirl.png"
              }
              alt="user avatar"
              layout="fill"
            />
          </div>
        </Col>
        <Col className="container-upload">
          <Form.Group controlId="formFile" className="avatar-upload">
            <Image src={"/upload_file.png"} alt="file upload" layout="fill" />

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
              value={formState.username ? formState.username : ""}
              onChange={(e) => {
                handleFieldChange(e);
              }}
            />
            <label htmlFor="floatingInputCustom">Nickname</label>
          </Form.Floating>
        </Col>
        <Col>
          <Form.Floating className="mb-3">
            <Form.Control
              className={"is-valid input-settings"}
              id="floatingPhoneCustom"
              type="phone"
              name="phoneNumber"
              value={formState.phoneNumber ? formState.phoneNumber : ""}
              onChange={(e) => {
                handleFieldChange(e);
              }}
            />

            <label htmlFor="floatingPhoneCustom">Teléfono</label>
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
          checked={formState.emailVerified ? formState.emailVerified : false}
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
  );
};

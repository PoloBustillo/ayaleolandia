/** @format */

import Head from "next/head";
import { Layout } from "../../components/Layout";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { loginWith } from "../../configs/firebase";
import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useUser();
  const router = useRouter();

  function validateForm() {
    return email.length > 0 && password.length > 0;
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
        <div className="Login">
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              onClick={async () => {
                await loginWith("google");
              }}
              block
              size="lg"
              type="submit"
              disabled={!validateForm()}
            >
              Login
            </Button>
          </Form>
        </div>
      </Layout>
    </div>
  );
}

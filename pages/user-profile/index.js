/** @format */

import Head from "next/head";

import { SWRConfig } from "swr";
import { Layout } from "components/Layout";
import { fetchGet } from "utils/methods";
import { useAuth } from "hooks/AuthUserProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function UserProfile({ fallback }) {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser == null && !loading) {
      router.push("/entrar-o-acceder");
    }
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
      <SWRConfig value={{ fallback }}>
        <Layout></Layout>
      </SWRConfig>
    </div>
  );
}

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

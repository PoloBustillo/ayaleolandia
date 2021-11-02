/** @format */
/* eslint-disable */
/* eslint no-use-before-define: 0 */

import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "hooks/AuthUserProvider";
import Head from "next/head";

function withAuth(WrappedComponent) {
  return (props) => {
    const { authUser, loading } = useAuth();
    console.log(loading);
    console.log(authUser);
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      if (loading) {
        return (
          <>
            <Head>
              <title>Joyería y accesorios</title>
              <meta
                name="description"
                content="Leolandia accesorios y joyeria al mejor precio"
              />
              <link rel="icon" href="/logo.png" />
            </Head>
            <div className="loading-container">
              <img src="/loading.gif" alt="loading..." />
            </div>
          </>
        );
      }
      if (!authUser) {
        Router.replace("/entrar-o-acceder");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
}
withAuth.displayName = "withAuth";
export default withAuth;

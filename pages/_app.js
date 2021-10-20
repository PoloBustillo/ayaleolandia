/** @format */

import "styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const userContext = React.createContext();
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

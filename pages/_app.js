/** @format */

import "styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SSRProvider from "react-bootstrap/SSRProvider";
import { AuthUserProvider } from "hooks/AuthUserProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </AuthUserProvider>
  );
}

export default MyApp;

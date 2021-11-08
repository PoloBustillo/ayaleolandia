/** @format */

import { createContext, useContext, Context } from "react";
import UseFirebaseAuth from "hooks/UseFirebaseAuth";

const authUserContext = createContext({
  authUser: null,
  loading: true,
  setAuthUser: () => {},
});

export function AuthUserProvider({ children }) {
  const auth = UseFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);

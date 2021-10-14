/** @format */

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "configs/firebase";

import { USER_STATES } from "utils/constants";

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED;
  }, [user]);

  return user;
}

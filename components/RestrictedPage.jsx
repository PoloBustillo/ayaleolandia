/** @format */

import React, { useEffect } from "react";
import { Layout } from "./Layout";
import { useAuth } from "hooks/AuthUserProvider";
import { useRouter } from "next/router";

export const RestrictedPage = ({ children }) => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser == null && !loading) {
      router.push("/entrar-o-acceder");
    }
  }, [authUser, loading, router]);

  if (authUser) {
    return <Layout>{children}</Layout>;
  }
  return <></>;
};

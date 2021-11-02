/** @format */

import React from "react";
import { signOutUser } from "configs/client/firebase";
import UserProfile from "./icons/UserProfileIcon";
import Link from "next/link";
import { useAuth } from "hooks/AuthUserProvider";

export const SideAvatar = (props) => {
  const { authUser } = useAuth();
  return (
    <div className="container-avatar">
      <div className={"settings"}>
        <Link href="/user-profile">
          <a
            onClick={() => {
              props.sideMenuFunc(false);
            }}
          >
            <UserProfile height="2em" width={"5em"}></UserProfile>
          </a>
        </Link>
      </div>

      <div className="avatar">
        <Link href="/user-profile">
          <a
            onClick={() => {
              props.sideMenuFunc(false);
            }}
          >
            <img
              src={authUser?.avatar ? authUser.avatar : "usergirl.png"}
              alt="user avatar"
            />
          </a>
        </Link>
      </div>

      <div className="status">
        {authUser ? (
          <>
            {authUser.name ? (
              <h2>{`Hola ${authUser.name}!`}</h2>
            ) : (
              <h2>{`Hola Usuario!`}</h2>
            )}
            <span
              onClick={() => {
                signOutUser();
                props.sideMenuFunc(false);
              }}
            >
              Salir
            </span>
          </>
        ) : (
          <Link href="/entrar-o-acceder">
            <a
              onClick={() => {
                props.sideMenuFunc(false);
              }}
            >
              <h2>{`Iniciar Sesion!`}</h2>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

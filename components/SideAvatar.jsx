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
        <img
          src={authUser?.avatar ? authUser.avatar : "usergirl.png"}
          alt="user avatar"
        />
      </div>
      <div className="status">
        <h2>Hola Lia Sofia!</h2>
        <span
          onClick={() => {
            signOutUser();
            props.sideMenuFunc(false);
          }}
        >
          Salir
        </span>
      </div>
    </div>
  );
};

/** @format */

import React from "react";
import { signOutUser } from "../configs/firebase";
import UserProfile from "./icons/UserProfileIcon";

export const SideAvatar = (props) => {
  return (
    <div className="container-avatar">
      <div className={"settings"}>
        <UserProfile height="2em" width={"11em"}></UserProfile>
      </div>
      <div>
        <div className="change-photo">
          <img id="camera-icon" src="/camera.png" alt="cambia foto" />
        </div>
        <div className="avatar">
          <img
            src="https://images.unsplash.com/photo-1486116736668-6384736c9330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2850&amp;q=80"
            alt="user avatar"
          />
        </div>
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

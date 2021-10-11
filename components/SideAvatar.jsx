/** @format */

import React from "react";

export const SideAvatar = () => {
  return (
    <div className="container-avatar">
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
        <span>Salir</span>
      </div>
    </div>
  );
};

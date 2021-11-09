/** @format */

import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Loader from "components/Loader";

export const ButtonLoader = (props) => {
  const [showLoader, setShowLoader] = useState(false);

  return (
    <Button
      onClick={async () => {
        setShowLoader(true);
        await props.clickFunc();
        setShowLoader(false);
      }}
      className={props.className}
      size={props.size}
      block={props.block.toString()}
      type={props.type}
    >
      {showLoader ? <Loader /> : props.children}
    </Button>
  );
};

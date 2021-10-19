/** @format */

import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Loader from "components/Loader";

export const ButtonLoader = (props) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Show loader a bits longer to avoid loading flash
    if (showLoader) {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 400);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showLoader]);

  return (
    <Button
      onClick={async () => {
        setShowLoader(true);
        await props.clickFunc();
        setShowLoader(false);
      }}
      onMouseUp={() => {
        if (props.onMouseUpFunc) props.onMouseUpFunc();
      }}
      className={props.className}
      size={props.size}
      block={props.block}
      type={props.type}
    >
      {showLoader ? <Loader /> : props.children}
    </Button>
  );
};

/** @format */

import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./title.module.scss";
import TextWithImage from "interfaces/TextWithImage";

const Title = (props: TextWithImage) => {
  const { text, image } = props;
  return (
    <div>
      <Image {...image} />
      <span className={styles.titletext}>{text}</span>
    </div>
  );
};

Title.propTypes = {
  text: PropTypes.string,
  width: PropTypes.number,
};

export default Title;

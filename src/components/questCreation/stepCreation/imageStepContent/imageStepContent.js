import React from "react";

import styles from "./imageStepContent.module.scss";

export const ImageStepContent = ({ imageSrc }) => {
  return (
    <div className={styles.step__imageContainer}>
      <img className={styles.step__image} src={imageSrc} alt="" />
    </div>
  );
};

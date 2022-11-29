import React from "react";
import styles from "./textStepContent.module.scss";

export const TextStepContent = ({ questionContent }) => {
  return <div className={styles.step__textQuestion}>{questionContent}</div>;
};

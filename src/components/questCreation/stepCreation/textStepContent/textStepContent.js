import React from "react";
import styles from "./textStepContent.module.scss";

export const TextStepContent = ({ text }) => {
  return <div className={styles.step__textQuestion}>{text}</div>;
};

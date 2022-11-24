import React from "react";

import { TextStepContent } from "../textStepContent/textStepContent";
// import { ImageStepContent } from "../imageStepContent/imageStepContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import styles from "./stepTemplate.module.scss";

export const StepTemplate = ({
  number,
  description,
  questionType,
  questionContent,
}) => {
  // const imageSrc =
  //   "https://cdn1.ozone.ru/s3/multimedia-0/wc1000/6470696436.jpg";

  return (
    <div className={styles.step__container}>
      <div className={styles.step__title}>Шаг {number}</div>
      <div className={styles.step__desc}>{description}</div>
      <div className={styles.step__content}>
        {questionType === "text" && (
          <TextStepContent questionContent={questionContent} />
        )}
        {/* {questionType === "image" && <ImageStepContent imageSrc={imageSrc} />} */}
      </div>
      <Box
        component="div"
        sx={{
          m: "0 auto",
          textAlign: "center",
          width: { xs: 1 / 1, sm: 200 },
        }}
      >
        <Button
          disabled
          fullWidth
          variant="contained"
          size="medium"
          sx={{ mt: 4, mb: { xs: 2, sm: 3 }, py: { xs: 1.5 } }}
        >
          Редактировать
        </Button>
      </Box>
    </div>
  );
};

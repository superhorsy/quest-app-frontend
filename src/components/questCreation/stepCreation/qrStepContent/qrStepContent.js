import React from "react";

import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import styles from "./qrStepContent.module.scss";

export const QRStepContent = ({ questionContent }) => {
  return (
    <Box
      component="div"
      sx={{
        m: "0 auto",
        mb: { xs: 2, sm: 3 },
        textAlign: "center",
        width: { xs: 1 / 1, sm: 500 },
      }}
    >
      <div className={styles.qrCodeBox}>
        <div className={styles.qrCodeBox__print}>
          <div className={styles.qrCodeBox__desc}>{questionContent}</div>
        </div>

        <div className={styles.qrCodeBox__qrBtn}>
          {/* <Button
            variant="contained"
            size="large"
            disabled={!questionContent}
          >
            Сохранить QR-код
          </Button> */}
        </div>
      </div>
    </Box>
  );
};

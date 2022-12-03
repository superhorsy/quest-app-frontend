import React from "react";

import { QuestExecution } from "../../../pages/questExecution/questExecution";
import { LinksFooter } from "../../linksFooter/linksFooter";
import { Header } from "../../Header/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Question from "../../../assets/images/themesIcons/common/question-512.png";
import QR from "../../../assets/images/themesIcons/common/qr-code-256.png";

import styles from "./commonThemePage.module.scss";

const linksData = [
  {
    linkUrl: "https://www.flaticon.com/free-stickers/question",
    linkText: "Question stickers created by Stickers – Flaticon",
    linkTitle: "question stickers",
  },
  {
    linkUrl: "https://www.flaticon.com/free-stickers/qr-code",
    linkText: "Qr code stickers created by kerismaker - Flaticon",
    linkTitle: "qr code stickers",
  },
];

const commonTheme = createTheme({
  palette: {
    primary: {
      light: "#d9fffe",
      main: "#a7d2cb",
      dark: "#77a19a",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#feb4a3",
      main: "#c98474",
      dark: "#965748",
      contrastText: "#ffffff",
    },
  },
});

export const CommonThemePage = () => {
  return (
    <ThemeProvider theme={commonTheme}>
      <>
        <Header />
        <div className={styles.decoratedPage}>
          <img
            className={styles.decoratedPage__stikerTopLeftRotaded}
            src={QR}
            alt="QR-code"
          />
          {/* <img
        className={styles.decoratedPage__stikerTopRight}
        src={Confetti}
        alt="confetti"
      /> */}
          {/* <img
        className={styles.decoratedPage__stikerBottomLeft}
        src={QR}
        alt="QR-code"
      /> */}
          <img
            className={styles.decoratedPage__stikerBottomRight}
            src={Question}
            alt="Question"
          />
          <QuestExecution />
        </div>
        <LinksFooter linksData={linksData} />
      </>
    </ThemeProvider>
  );
};

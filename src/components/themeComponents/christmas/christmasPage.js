import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { QuestExecution } from "../../../pages/questExecution/questExecution";
import { LinksFooter } from "../../linksFooter/linksFooter";

import Christmas from "../../../assets/images/themesIcons/newYear/christmas.png";
import ChristmasCatBall from "../../../assets/images/themesIcons/newYear/christmas-catball-256.png";
import Cat from "../../../assets/images/themesIcons/newYear/cat-256.png";
import Gift from "../../../assets/images/themesIcons/newYear/gift-128.png";

import styles from "./christmasPage.module.scss";

const linksData = [
  {
    linkUrl: "https://www.flaticon.com/free-stickers/christmas",
    linkText: "Christmas stickers created by Tatsiana Harbunova - Flaticon",
    linkTitle: "christmas stickers",
  },
];

const christmasTheme = createTheme({
  palette: {
    primary: {
      light: "#60ad5e",
      main: "#2e7d32",
      dark: "#005005",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ff6434",
      main: "#dd2c00",
      dark: "#a30000",
      contrastText: "#ffffff",
    },
  },
});

export const ChristmasPage = () => {
  return (
    <ThemeProvider theme={christmasTheme}>
      <>
        <div className={styles.decoratedPage}>
          <img
            className={styles.decoratedPage__stikerTopLeft}
            src={ChristmasCatBall}
            alt="snowball"
          />
          <img
            className={styles.decoratedPage__stikerTopRight}
            src={Gift}
            alt="gift"
          />
          <img
            className={styles.decoratedPage__stikerBottomLeft}
            src={Cat}
            alt="cat"
          />
          <img
            className={styles.decoratedPage__stikerBottomRight}
            src={Christmas}
            alt="tree"
          />
          <QuestExecution />
        </div>
        <LinksFooter linksData={linksData} />
      </>
    </ThemeProvider>
  );
};

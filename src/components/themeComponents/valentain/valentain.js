import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { QuestExecution } from "../../../pages/questExecution/questExecution";
import { LinksFooter } from "../../linksFooter/linksFooter";
import { Header } from "../../Header/Header";

import Avocado from "../../../assets/images/themesIcons/valentain/avocado-256.png";
import LoveBalloons from "../../../assets/images/themesIcons/valentain/balloon-512.png";
import February14 from "../../../assets/images/themesIcons/valentain/february-14-256.png";

import styles from "./valentain.module.scss";

const linksData = [
  {
    linkUrl: "https://www.flaticon.com/free-stickers/february-14",
    linkText: "February-14 stickers created by paulalee – Flaticon",
    linkTitle: "february-14 stickers",
  },
  {
    linkUrl: "https://www.flaticon.com/free-stickers/heart",
    linkText: "Heart stickers created by paulalee – Flaticon",
    linkTitle: "heart stickers",
  },
  {
    linkUrl: "https://www.flaticon.com/free-stickers/avocado",
    linkText: "Avocado stickers created by paulalee - Flaticon",
    linkTitle: "avocado stickers",
  },
];

const ValentainTheme = createTheme({
  palette: {
    primary: {
      light: "#ff6090",
      main: "#e91e63",
      dark: "#b0003a",
      contrastText: "#000000",
    },
    secondary: {
      light: "#ffb2dd",
      main: "#ff80ab",
      dark: "#c94f7c",
      contrastText: "#ffffff",
    },
  },
});

export const ValentainPage = () => {
  return (
    <ThemeProvider theme={ValentainTheme}>
      <>
        <Header/>
        <div className={styles.decoratedPage}>
          <img
            className={styles.decoratedPage__stikerTopLeftRotaded}
            src={February14}
            alt="February 14"
          />
          {/* <img
        className={styles.decoratedPage__stikerTopRight}
        src={Confetti}
        alt="confetti"
      /> */}
          <img
            className={styles.decoratedPage__stikerBottomLeft}
            src={Avocado}
            alt="avocado"
          />
          <img
            className={styles.decoratedPage__stikerBottomRight}
            src={LoveBalloons}
            alt="baloons"
          />
          <QuestExecution />
        </div>
        <LinksFooter linksData={linksData} />
      </>
    </ThemeProvider>
  );
};

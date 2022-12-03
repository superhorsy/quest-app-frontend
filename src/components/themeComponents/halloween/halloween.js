import React from "react";

import { QuestExecution } from "../../../pages/questExecution/questExecution";
import { LinksFooter } from "../../linksFooter/linksFooter";
import { Header } from "../../Header/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Castle from "../../../assets/images/themesIcons/halloween/castle-house-512.png";
import Pumpkin from "../../../assets/images/themesIcons/halloween/pumpkin-256.png";
import Vampire from "../../../assets/images/themesIcons/halloween/vampire-256.png";

import styles from "./halloween.module.scss";

const halloweenTheme = createTheme({
  palette: {
    primary: {
      light: "#484848",
      main: "#212121",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ffa040",
      main: "#ff6f00",
      dark: "#c43e00",
      contrastText: "#000000",
    },
    text: {
      primary: "#212121",
      secondary: "#ff6f00",
    },
  },
});

export const HalloweenPage = () => {
  const linksData = [
    {
      linkUrl: "https://www.flaticon.com/free-stickers/halloween",
      linkText: "Halloween stickers created by Tatsiana Harbunova – Flaticon",
      linkTitle: "halloween stickers",
    },
    {
      linkUrl: "https://www.flaticon.com/free-stickers/pumpkin",
      linkText: "Pumpkin stickers created by Tatsiana Harbunova – Flaticon",
      linkTitle: "pumpkin stickers",
    },
    {
      linkUrl: "https://www.flaticon.com/free-stickers/halloween-party",
      linkText:
        "Halloween party stickers created by Tatsiana Harbunova - Flaticon",
      linkTitle: "halloween party stickers",
    },
  ];

  return (
    <ThemeProvider theme={halloweenTheme}>
      <>
        <Header />
        <div className={styles.decoratedPage}>
          <img
            className={styles.decoratedPage__stikerTopLeftRotaded}
            src={Vampire}
            alt="Vampire"
          />
          {/* <img
              className={styles.decoratedPage__stikerTopRight}
              src={Confetti}
              alt="confetti"
            /> */}
          <img
            className={styles.decoratedPage__stikerBottomLeft}
            src={Pumpkin}
            alt="Pumpkin"
          />
          <img
            className={styles.decoratedPage__stikerBottomRight}
            src={Castle}
            alt="Happy Halloween"
          />
          <QuestExecution />
        </div>
        <LinksFooter linksData={linksData} />
      </>
    </ThemeProvider>
  );
};

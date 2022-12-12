import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { QuestExecution } from "../../../pages/questExecution/newStepper/newStepper";
import { LinksFooter } from "../../linksFooter/linksFooter";
import { Header } from "../../Header/Header";

import HappyBithday from "../../../assets/images/themesIcons/bithday/happy-birthday-256.png";
import Balloons from "../../../assets/images/themesIcons/bithday/balloon-512.png";
import Confetti from "../../../assets/images/themesIcons/bithday/confetti-256.png";
import styles from "./birthday.module.scss";

const linksData = [
  {
    linkUrl: "https://www.flaticon.com/free-stickers/birthday",
    linkText: "Birthday stickers created by frdmn – Flaticon",
    linkTitle: "birthday stickers",
  },
  {
    linkUrl: "https://www.flaticon.com/free-stickers/birthday-and-party",
    linkText: " Birthday and party stickers created by frdmn – Flaticon",
    linkTitle: "birthday and party stickers",
  },
  {
    linkUrl: "https://www.flaticon.com/free-stickers/happy-birthday",
    linkText: "Happy-birthday stickers created by frdmn - Flaticon",
    linkTitle: "happy-birthday stickers",
  },
];

const birthdayTheme = createTheme({
  palette: {
    primary: {
      light: "#daffff",
      main: "#a8d8d1",
      dark: "#78a6a0",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ffbcf1",
      main: "#e78bbe",
      dark: "#b35c8e",
      contrastText: "#ffffff",
    },
  },
});

export const BirthdayPage = () => {
  return (
    <ThemeProvider theme={birthdayTheme}>
      <>
        <Header />
        <div className={styles.decoratedPage}>
          <img
            className={styles.decoratedPage__stikerTopLeftRotaded}
            src={HappyBithday}
            alt="Happy Bithday"
          />
          {/* <img
              className={styles.decoratedPage__stikerTopRight}
              src={}
              alt=""
            /> */}
          <img
            className={styles.decoratedPage__stikerBottomLeft}
            src={Confetti}
            alt="confetti"
          />
          <img
            className={styles.decoratedPage__stikerBottomRight}
            src={Balloons}
            alt="baloons"
          />
          <QuestExecution />
        </div>
        <LinksFooter linksData={linksData} />
      </>
    </ThemeProvider>
  );
};

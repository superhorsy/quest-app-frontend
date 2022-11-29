import React from "react";

import { HalloweenPage } from "../../../components/themeComponents/halloween/halloween";
import { BirthdayPage } from "../../../components/themeComponents/birthday/birthday";
import { ValentainPage } from "../../../components/themeComponents/valentain/valentain";
import { CommonTheamPage } from "../../../components/themeComponents/common/commonTheamPage";
import { ChristmasPage } from "../../../components/themeComponents/christmas/christmasPage";

export const DecoratedPage = () => {
  const thema = "Common";
  return (
    <>
      {thema === "Christmas" && <ChristmasPage />}
      {thema === "BirthDay" && <BirthdayPage />}
      {thema === "Valentain" && <ValentainPage />}
      {thema === "Halloween" && <HalloweenPage />}
      {thema === "Common" && <CommonTheamPage />}
    </>
  );
};

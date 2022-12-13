import React from "react";

import { HalloweenPage } from "../../../components/themeComponents/halloween/halloween";
import { BirthdayPage } from "../../../components/themeComponents/birthday/birthday";
import { ValentainPage } from "../../../components/themeComponents/valentain/valentain";
import { CommonThemePage } from "../../../components/themeComponents/common/commonThemePage";
import { ChristmasPage } from "../../../components/themeComponents/christmas/christmasPage";
import { QuestExecution } from "../../questExecution/newStepper/newStepper";

import Box from "@mui/material/Box";


export const DecoratedPage = () => {
  const theme = "christmas";

  return (
    <Box sx={{mt: 0}}>
      {theme === "christmas" && <ChristmasPage />}
      {theme === "birthday" && <BirthdayPage />}
      {theme === "valentain" && <ValentainPage />}
      {theme === "halloween" && <HalloweenPage />}
      {theme === "common" && <CommonThemePage />}
      {theme === "standart" && <QuestExecution />}
    </Box>
  );
};

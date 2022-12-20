import React from "react";

import { HalloweenPage } from "../../../components/themeComponents/halloween/halloween";
import { BirthdayPage } from "../../../components/themeComponents/birthday/birthday";
import { ValentainPage } from "../../../components/themeComponents/valentain/valentain";
import { CommonThemePage } from "../../../components/themeComponents/common/commonThemePage";
import { ChristmasPage } from "../../../components/themeComponents/christmas/christmasPage";
import { StandartPage } from "../../../components/themeComponents/standart/standart";


import Box from "@mui/material/Box";
import {useSelector} from "react-redux";

export const ExamplePage = () => {
  const {theme} = useSelector((state) => state.currentQuestReducer.currentQuest);

  return (
    <Box sx={{mt: 0}}>
      {theme === "christmas" && <ChristmasPage example={true} />}
      {theme === "birthday" && <BirthdayPage example={true} />}
      {theme === "valentain" && <ValentainPage example={true} />}
      {theme === "halloween" && <HalloweenPage example={true} />}
      {theme === "common" && <CommonThemePage example={true} />}
      {theme === "standart" && <StandartPage example={true} />}
    </Box>
  );
};
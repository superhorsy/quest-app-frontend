import React, {useEffect} from "react";

import { HalloweenPage } from "../../../components/themeComponents/halloween/halloween";
import { BirthdayPage } from "../../../components/themeComponents/birthday/birthday";
import { ValentainPage } from "../../../components/themeComponents/valentain/valentain";
import { CommonThemePage } from "../../../components/themeComponents/common/commonThemePage";
import { ChristmasPage } from "../../../components/themeComponents/christmas/christmasPage";
import { StandartPage } from "../../../components/themeComponents/standart/standart";


import Box from "@mui/material/Box";
import {useSelector, useDispatch} from "react-redux";
import { useParams } from "react-router-dom";

import { getStatusQuest, getInitQuest } from "../../../store/actions/actions";



export const DecoratedPage = () => {
  const dispatch = useDispatch();
  const {questId} = useParams();

  const questStatus = useSelector((state) => state.questExecutionReducer.questStatus);

  const theme = useSelector((state) => state.questExecutionReducer.questTheme);

  useEffect(() => {
    dispatch(getStatusQuest(questId));
  }, []);

  useEffect(() => {
    if (questStatus === "not_started") {
      dispatch(getInitQuest(questId));
    }
  }, [questStatus]);

  return (
    <Box sx={{mt: 0}}>
      {theme === "christmas" && <ChristmasPage example={false}/>}
      {theme === "birthday" && <BirthdayPage example={false}/>}
      {theme === "valentain" && <ValentainPage example={false}/>}
      {theme === "halloween" && <HalloweenPage example={false}/>}
      {theme === "common" && <CommonThemePage example={false}/>}
      {theme === "standart" && <StandartPage example={false}/>}
    </Box>
  );
};

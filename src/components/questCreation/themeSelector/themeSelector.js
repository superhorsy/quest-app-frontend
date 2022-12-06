import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTheme } from "../../../store/reducers/currentQuestSlice";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import HalloweenImg from "../../../assets/images/themePreviews/halloweenTheme.jpg";
import BirthdayImg from "../../../assets/images/themePreviews/birthdayTheme.jpg";
import ValentainImg from "../../../assets/images/themePreviews/valentainTheme.jpg";
import ChristmasImg from "../../../assets/images/themePreviews/christmasTheme.jpg";
import CommonImg from "../../../assets/images/themePreviews/commonTheme.jpg";
import NoneImg from "../../../assets/images/themePreviews/noneTheme.jpg";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const ThemeCard = ({ imgUrl, altText }) => {
  return (
    <Card sx={{ width: {xs: 200, sm: 1} }}>
      <CardMedia component="img" alt={altText} height="auto" image={imgUrl} />
    </Card>
  );
};

export const ThemeSelector = () => {
  const themes = [
    { name: "Common", imgUrl: CommonImg, altText: "common" },
    { name: "Christmas", imgUrl: ChristmasImg, altText: "christmas" },
    { name: "Birthday", imgUrl: BirthdayImg, altText: "birthday" },
    { name: "Valentain", imgUrl: ValentainImg, altText: "valentain" },
    { name: "Halloween", imgUrl: HalloweenImg, altText: "halloween" },
    { name: "Standart", imgIrl: NoneImg, altText: "standart" },
  ];
  const theme = useSelector(
    (state) => state.currentQuestReducer.currentQuest.theme ?? "standart"
  );
  const dispatch = useDispatch();
  return (
    <>
      <Accordion sx={{ mt: 2, mb: 2, borderRadius: 1, borderTop: 0 }}>
        <AccordionSummary
          sx={{ m: 0, borderTop: 0 }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            sx={{ textAlign: "center" }}
          >
            Текущая тема: <b>{theme}</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ m: 0, pb: 1, pt: 0, borderTop: 0 }}>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between", flexDirection: {xs: "column", sm: "row"} }}
          >
            <Box
              component="div"
              sx={{
                width: {xs: 1,sm: 1 / 2},
                mb: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {theme === "common" && (
                <ThemeCard imgUrl={CommonImg} altText="common" />
              )}
              {theme === "christmas" && (
                <ThemeCard imgUrl={ChristmasImg} altText="christmas" />
              )}
              {theme === "birthday" && (
                <ThemeCard imgUrl={BirthdayImg} altText="birthday" />
              )}
              {theme === "valentain" && (
                <ThemeCard imgUrl={ValentainImg} altText="valentain" />
              )}
              {theme === "halloween" && (
                <ThemeCard imgUrl={HalloweenImg} altText="halloween" />
              )}
              {(theme === "standart" || theme === null) && (
                <ThemeCard imgUrl={NoneImg} altText="standart" />
              )}
            </Box>
            <FormControl
              component="div"
              sx={{
                // width: { xs: 1, sm: 600 },
                width: 1 ,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
              }}
            >
              <RadioGroup
                sx={{
                  // width: { xs: 1, sm: 550 },
                  width: 1,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
                }}
                row
                aria-labelledby="theme-redio"
                name="theme-redio"
                value={theme}
                onChange={(e) => dispatch(updateTheme(e.target.value))}
              >
                {themes &&
                  themes.map((item, ind) => (
                    <FormControlLabel
                      // sx={{ minWidth: 125 }}
                      sx={{ width: 1 / 3, fontSize: {xs: 10, sm: 14} }}
                      key={ind}
                      value={item.altText}
                      control={<Radio />}
                      label={item.altText}
                    ></FormControlLabel>
                  ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

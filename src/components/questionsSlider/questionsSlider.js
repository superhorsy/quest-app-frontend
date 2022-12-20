import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useMediaQuery } from "../../utils/utils";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import styles from "./questionsSlider.module.scss";

export const QuestionsSlider = () => {
  const matches = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();

  const { steps } = useSelector(
    (state) => state.currentQuestReducer.currentQuest
  );
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <h1 className={styles.title}>Прохождение квеста</h1>
      <Box
        sx={{
          m: "0 auto",
          mt: 2,
          maxWidth: 600,
          minHeight: "55vh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <>
          <Box
            component="div"
            sx={{ display: "flex", width: 1, p: 2, boxSizing: "border-box" }}
          >
            <Box
              sx={{
                display: "block",
                mr: 2,
                width: { xs: 20, sm: 25 },
                height: { xs: 20, sm: 25 },
              }}
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                  backgroundColor: "primary.main",
                  width: { xs: 20, sm: 25 },
                  height: { xs: 20, sm: 25 },
                  textAlign: "center",
                  position: "relative",
                  color: "primary.contrastText",
                }}
              >
                <Box
                  sx={{
                    fontWeight: 700,
                    lineHeight: 1,
                    fontSize: { xs: 12, sm: 14 },
                    display: "block",
                    position: "absolute",
                    transform: "translate(0, 0)",
                  }}
                >
                  {steps[activeStep].sort}
                </Box>
              </Box>
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: { xs: 12, sm: 14 } }}>
              {steps[activeStep].description}
            </Typography>
          </Box>

          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 1,
              minHeight: {xs: "30vh", sm: 500},
              padding: "0 15px",
              boxSizing: "border-box",
              overflowX: "hidden",
            }}
          >
            <Box component="div">
              {steps[activeStep].question_type === "text" && (
                <Typography sx={{ textAlign: "center" }}>
                  {steps[activeStep].question_content}
                </Typography>
              )}
            </Box>
            <Box component="div">
              {steps[activeStep].question_type === "qr" && (
                <Button>Отсканировать код</Button>
              )}
            </Box>
            {steps[activeStep].question_type === "image" && (
              <Box component="div" className={styles.imageBox}>
                {!matches && (
                  <img
                    src={`${steps[activeStep].question_content}&w=450&h=450&fit=contain`}
                    alt="задание с картинкой"
                  />
                )}
                {matches && (
                  <img
                    src={`${steps[activeStep].question_content}&w=200&h=200&fit=contain`}
                    alt="задание с картинкой"
                  />
                )}
              </Box>
            )}
            <Box component="div">
              {steps[activeStep].question_type === "audio" && (
                <audio controls>
                  <source
                    src={steps[activeStep].question_content}
                    type="audio/mp3"
                  />
                  <source
                    src={steps[activeStep].question_content}
                    type="audio/wav"
                  />
                  <source
                    src={steps[activeStep].question_content}
                    type="audio/webm"
                  />
                </audio>
              )}
            </Box>
          </Box>
          <Box
            component="div"
            sx={{ position: "relative", height: "10vh", width: "100%" }}
          >
            <MobileStepper
              sx={{ width: 1, position: "absolute", p: 0 }}
              variant="progress"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Box>
          <Button
            sx={{m: "0 auto"}}
            size="middle"
            variant="contained"
            onClick={() => navigate("/panel/my-quests")}
          >
            Вернуться назад
          </Button>
        </>
      </Box>
    </>
  );
};

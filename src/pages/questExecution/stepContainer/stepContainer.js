import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { QRStep } from "../questionsContent/qrStep/qrStep";
import { useNavigate } from "react-router-dom";

export const StepContainer = ({
  activeStep,
  current,
  answer,
  setAnswer,
  success,
  questionCount,
  questStatus,
  handleNext,
  qrCodeAnswer,
}) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 600, minHeight: "55vh", position: "relative" }}>
      {activeStep === questionCount && questStatus === "finished" ? (
        <>
          <Box
            sx={{ mt: 10, width: 1, display: "flex", flexDirection: "column" }}
          >
            <Typography
              sx={{ textAlign: "center", fontSize: { xs: 20, sm: 30 } }}
            >
              Поздравляем с прохождением квеста!
            </Typography>
            <Button
              size="large"
              variant="contained"
              onClick={() => navigate("/panel")}
              sx={{ m: "0 auto", mt: 5 }}
            >
              Вернуться назад
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box component="div" sx={{ display: "flex", width: 1, p: 2 }}>
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
                mr: 2,
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
                {current?.sort}
              </Box>
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: { xs: 12, sm: 14 } }}>
              {current?.description}
            </Typography>
          </Box>
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 1,
              minHeight: "45vh",
              overflowX: "hidden",
            }}
          >
            <Box component="div">
              {current.question_type === "text" && (
                <Typography sx={{ mt: 2, mb: 1, textAlign: "center" }}>
                  {current?.question_content}
                </Typography>
              )}
            </Box>
            <Box component="div">
              {current.question_type === "qr" && (
                <QRStep qrCodeAnswer={qrCodeAnswer} />
              )}
            </Box>
          </Box>

          {current.question_type !== "qr" && (
            <Input
              required
              sx={{
                mb: { xs: 1, sm: 2 },
                mt: { xs: 3, sm: 4 },
                position: "absolute",
                bottom: 40,
                left: 15,
              }}
              id="outlined-basic-answer"
              placeholder="Ваш ответ"
              size="small"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          )}

          {success && current.sort !== 1 && (
            <Typography
              sx={{
                width: 1,
                color: "success.main",
                fontWeight: 700,
                textAlign: "center",
                fontSize: { xs: 12, sm: 14 },
                position: "absolute",
                left: 0,
                bottom: 0,
              }}
            >
              Вы ответили верно!
            </Typography>
          )}

          {!success && (
            <Typography
              sx={{
                width: 1,
                color: "error.main",
                fontWeight: 700,
                textAlign: "center",
                fontSize: { xs: 12, sm: 14 },
                position: "absolute",
                left: 0,
                bottom: 0,
              }}
            >
              Вы ответили неправильно, поробуйте еще раз
            </Typography>
          )}
          {current.question_type !== "qr" && (
            <Button
              size="middle"
              variant="outlined"
              sx={{ position: "absolute", bottom: 0, right: 20 }}
              disabled={!answer.length}
              onClick={handleNext}
            >
              {activeStep === questionCount ? "Завершить" : "Ответить"}
            </Button>
          )}
          {current.question_type === "qr" && (
            <Button
              size="middle"
              variant="outlined"
              sx={{ position: "absolute", bottom: -60, right: 20 }}
              disabled={!qrCodeAnswer?.length}
              onClick={handleNext}
            >
              {activeStep === questionCount ? "Завершить" : "Ответить"}
            </Button>
          )}
        </>
      )}
    </Box>
  );
};

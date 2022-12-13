import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addAnswerFromQRCodeReader } from "../../../store/reducers/questExecutionSlice";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Input from "@mui/material/Input";

import { QRStep } from "../questionsContent/qrStep/qrStep";

import Box from "@mui/material/Box";

import styles from "./newStepper.module.scss";

import {
  // getInitQuest,
  // getStatusQuest,
  getNextQuest,
} from "../../../store/actions/actions";
import {Loader} from "../../../components/loader/loader";



export const QuestExecution = () => {
  const { current, questionCount, questStatus, success, qrCodeAnswer, isLoading } =
    useSelector((state) => state.questExecutionReducer);

  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { questId } = useParams();

  // useEffect(() => {
  //   dispatch(getStatusQuest(questId));
  // }, []);

  // useEffect(() => {
  //   if (questStatus === "not_started") {
  //     dispatch(getInitQuest(questId));
  //   }
  // }, [questStatus]);

  /**
   * Handlers
   */
  const handleNext = () => {
    if (current.question_type !== "qr") {
      dispatch(
        getNextQuest({ questId: questId, answer_type: "text", answer: answer })
      );
      setAnswer("");
    }
    if (current.question_type === "qr" && qrCodeAnswer !== null) {
      dispatch(
        getNextQuest({
          questId: questId,
          answer_type: "text",
          answer: qrCodeAnswer,
        })
      );
      dispatch(addAnswerFromQRCodeReader(null));
    }
  };

  /**
   * Render
   */

  const renderCompleteQuest = () => (
    <Box sx={{ mt: 10, width: 1, display: "flex", flexDirection: "column" }}>
      <Typography sx={{ textAlign: "center", fontSize: { xs: 20, sm: 30 } }}>
        Поздравляем с прохождением квеста!
      </Typography>
      <Button
        size="large"
        variant="contained"
        onClick={() => navigate("/panel/available-quests")}
        sx={{ m: "0 auto", mt: 5 }}
      >
        Вернуться назад
      </Button>
    </Box>
  );

  const renderQuestSteps = () => (
    <Box
      sx={{
        maxWidth: 600,
        // minHeight: "55vh",
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
            className="superBox"
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
                {current?.sort}
              </Box>
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
            minHeight: "30vh",
            padding: "0 15px",
            boxSizing: "border-box",
            overflowX: "hidden",
          }}
        >
          <Box component="div">
            {current.question_type === "text" && (
              <Typography sx={{ textAlign: "center" }}>
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
        <Box
          className="AnswerBlock"
          component="div"
          sx={{ position: "relative", height: "10vh", width: "100%" }}
        >
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
                textAlign: "end",
                fontSize: { xs: 12, sm: 14 },
                position: "absolute",
                right: 10,
                bottom: 50,
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
                textAlign: "end",
                fontSize: { xs: 12, sm: 14 },
                position: "absolute",
                right: 10,
                bottom: 50,
              }}
            >
              Вы ответили неправильно,
              <br /> поробуйте еще раз
            </Typography>
          )}
          {/* кнопки ответить или назад */}

          {current.question_type !== "qr" && (
            <Button
              size="middle"
              variant="contained"
              sx={{ position: "absolute", bottom: 0, right: 20 }}
              disabled={!answer.length}
              onClick={handleNext}
            >
              {current.sort === questionCount ? "Завершить" : "Ответить"}
            </Button>
          )}
          {current.question_type === "qr" && (
            <Button
              size="middle"
              variant="contained"
              sx={{ position: "absolute", bottom: 0, right: 20 }}
              disabled={!qrCodeAnswer?.length}
              onClick={handleNext}
            >
              {current.sort === questionCount ? "Завершить" : "Ответить"}
            </Button>
          )}
          <Button
            size="middle"
            variant="outlined"
            sx={{ position: "absolute", bottom: 0, left: 20 }}
            onClick={() => navigate("/panel/available-quests")}
          >
            Вернуться назад
          </Button>
        </Box>
      </>
    </Box>
  );

  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className={styles.title}>Прохождение квеста</h1>
        {isLoading ? <Loader/> : questStatus === "finished"
          ? renderCompleteQuest()
          : renderQuestSteps()}
      </div>
    </div>
  );
};

import React, {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {addAnswerFromQRCodeReader} from "../../../store/reducers/questExecutionSlice";
import {getNextQuest} from "../../../store/actions/actions";
import {useMediaQuery} from "../../../utils/utils";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";

import {QRStep} from "../questionsContent/qrStep/qrStep";
import {Loader} from "../../../components/loader/loader";
import {Notification} from "../notification/notification";

import styles from "./newStepper.module.scss";
import {Coupon} from "../../../components/couponConstructor/coupon/coupon";

export const QuestExecution = () => {
  const {
    current,
    questionCount,
    questStatus,
    qrCodeAnswer,
    isLoading,
    notification,
    finalMessage,
    questTheme,
    rewards,
  } = useSelector((state) => state.questExecutionReducer);
  const matches = useMediaQuery("(max-width: 600px)");

  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {questId} = useParams();

  /**
   * Handlers
   */
  const handleNext = () => {
    if (current.question_type !== "qr") {
      dispatch(
        getNextQuest({questId: questId, answer_type: "text", answer: answer})
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
    <Box sx={{mt: 10, width: 1, display: "flex", flexDirection: "column"}}>
      {finalMessage ? (
        <Typography sx={{textAlign: "center", fontSize: {xs: 20, sm: 30}, p: "0 5px"}}>
          {finalMessage}
        </Typography>
      ) : (
        <Typography sx={{textAlign: "center", fontSize: {xs: 20, sm: 30}, p: "0 5px"}}>
          Поздравляем с прохождением квеста!
        </Typography>
      )}
      {rewards && <Coupon sx={{paddingTop: '50px'}} questTheme={questTheme} data={rewards[0]}/>}
      <Button
        size="large"
        variant="contained"
        onClick={() => navigate("/panel/available-quests")}
        sx={{m: "0 auto", mt: 5}}
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
          sx={{display: "flex", width: 1, p: 2, boxSizing: "border-box"}}
        >
          <Box
            sx={{
              display: "block",
              mr: 2,
              width: {xs: 20, sm: 25},
              height: {xs: 20, sm: 25},
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
                width: {xs: 20, sm: 25},
                height: {xs: 20, sm: 25},
                textAlign: "center",
                position: "relative",
                color: "primary.contrastText",
              }}
            >
              <Box
                sx={{
                  fontWeight: 700,
                  lineHeight: 1,
                  fontSize: {xs: 12, sm: 14},
                  display: "block",
                  position: "absolute",
                  transform: "translate(0, 0)",
                }}
              >
                {current?.sort}
              </Box>
            </Box>
          </Box>
          <Typography sx={{fontWeight: 700, fontSize: {xs: 12, sm: 14}}}>
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
              <Typography sx={{textAlign: "center"}}>
                {current?.question_content}
              </Typography>
            )}
          </Box>
          <Box component="div">
            {current.question_type === "qr" && (
              <QRStep qrCodeAnswer={qrCodeAnswer}/>
            )}
          </Box>
          {current.question_type === "image" && (
            <Box component="div" className={styles.imageBox}>
              {!matches && (
                <img
                  // src={`${current.question_content}&w=450&h=450&fit=contain`}
                  src={current.question_content}
                  alt="задание с картинкой"
                />
              )}
              {matches && (
                <img
                  // src={`${current.question_content}&w=200&h=200&fit=contain`}
                  src={current.question_content}
                  alt="задание с картинкой"
                />
              )}
            </Box>
          )}
          <Box component="div">
            {current.question_type === "audio" && (
              <audio controls>
                <source src={current.question_content} type="audio/mp3"/>
                <source src={current.question_content} type="audio/wav"/>
                <source src={current.question_content} type="audio/webm"/>
              </audio>
            )}
          </Box>
        </Box>
        <Box
          component="div"
          sx={{position: "relative", height: "10vh", width: "100%"}}
        >
          {current.question_type !== "qr" && (
            <Input
              required
              sx={{
                mb: {xs: 1, sm: 2},
                mt: {xs: 3, sm: 4},
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
          <Notification notification={notification}></Notification>

          {current.question_type !== "qr" && (
            <Button
              size="middle"
              variant="contained"
              sx={{position: "absolute", bottom: 0, right: 20}}
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
              sx={{position: "absolute", bottom: 0, right: 20}}
              disabled={!qrCodeAnswer?.length}
              onClick={handleNext}
            >
              {current.sort === questionCount ? "Завершить" : "Ответить"}
            </Button>
          )}
          <Button
            size="middle"
            variant="outlined"
            sx={{position: "absolute", bottom: 0, left: 20}}
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
        {isLoading ? (
          <Loader/>
        ) : questStatus === "finished" ? (
          renderCompleteQuest()
        ) : (
          renderQuestSteps()
        )}
      </div>
    </div>
  );
};

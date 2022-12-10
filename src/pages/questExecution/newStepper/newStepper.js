import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addAnswerFromQRCodeReader } from "../../../store/reducers/questExecutionSlice";

import Box from "@mui/material/Box";

import {
  getInitQuest,
  getStatusQuest,
  getNextQuest,
} from "../../../store/actions/actions";

import { StepContainer } from "../stepCard/stepCard";

export const QuestExecution = () => {
  const {
    current,
    previous,
    questionCount,
    isLoading,
    questStatus,
    error,
    success,
    qrCodeAnswer,
  } = useSelector((state) => state.questExecutionReducer);

  const [activeStep, setActiveStep] = useState(current?.sort);

  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();

  const { questId } = useParams();

  useEffect(() => {
    dispatch(getStatusQuest(questId));
  }, []);

  useEffect(() => {
    if (questStatus === "not_started") {
      dispatch(getInitQuest(questId));
    }
  }, [questStatus]);

  /**
   * Handlers
   */
  const handleNext = () => {
    console.log("Вызвался хендлер степпера");
    if (current.question_type !== "qr") {
      dispatch(
        getNextQuest({ questId: questId, answer_type: "text", answer: answer })
      );
      setAnswer("");
    }
  };
  useEffect(() => {
    if(current.question_type === "qr" && qrCodeAnswer !== null) {
      dispatch(
        getNextQuest({ questId: questId, answer_type: "text", answer: qrCodeAnswer })
      );
      dispatch(addAnswerFromQRCodeReader(null));
    }
  }, [qrCodeAnswer])

  /**
   * Render
   */

  const renderQuestSteps = () => (
    <Box sx={{ maxWidth: 600 }}>
      <StepContainer
        activeStep={current.sort}
        current={current}
        answer={answer}
        setAnswer={setAnswer}
        success={success}
        questionCount={questionCount}
        questStatus={questStatus}
        handleNext={handleNext}
        qrCodeAnswer={qrCodeAnswer}
      />
    </Box>
  );

  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="title">Прохождение квеста</h1>
        {renderQuestSteps()}
      </div>
    </div>
  );
};

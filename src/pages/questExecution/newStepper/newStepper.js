import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";

import {
  getInitQuest,
  getStatusQuest,
  getNextQuest,
} from "../../../store/actions/actions";

import { StepContainer } from "../stepCard/stepCard";

export const QuestExecution = () => {
  /**
   * Init data
   */
  const {
    current,
    previous,
    questionCount,
    isLoading,
    questStatus,
    error,
    success,
  } = useSelector((state) => state.questExecutionReducer);
  const [activeStep, setActiveStep] = useState(current?.sort);
  const steps = current?.description ? [current?.description] : [""];
  const [reqId, setReqId] = useState(1);
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
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
    dispatch(
      getNextQuest({ questId: questId, answer_type: "text", answer: answer })
    );
    setAnswer("");
  };

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
        handleNext= {handleNext}
      />
    </Box>
  );

  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="title">Прохождение квеста</h1>
        {/*{reqId > totalQuestsCount ? renderCompleteQuest() : renderQuestSteps()}*/}
        {renderQuestSteps()}
      </div>
    </div>
  );
};

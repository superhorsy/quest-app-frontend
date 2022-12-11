import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
// import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import {getInitQuest, getStatusQuest, getNextQuest} from "../../store/actions/actions";
import QRScan from "../../components/qrCodeReader/qrCodeReader";
import {Scanner} from "../../components/qrCodeReader/qrTestReader";
// import {ColorLibStepIcon} from "./questExecutionConfig";
// import {ColorLibStepIcon} from "./questExecutionConfig";

export const QuestExecution = () => {
  /**
   * Init data
   */
  const {current, previous, questionCount, isLoading, questStatus, error, test} = useSelector(
    (state) => state.questExecutionReducer
  );
  const [activeStep, setActiveStep] = useState(0);
  const steps = current?.description ? [current?.description] : [''];
  const [answer, setAnswer] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {questId} = useParams();

  /**
   * Lifecycle
   */

  // const isStepOptional = (step) => {
  //   return step === 1;
  // };

  // const isStepSkipped = (step) => {
  //   return skipped.has(step);
  // };

  useEffect(() => {
    dispatch(getStatusQuest(questId));
  }, [dispatch, questId]);

  useEffect(() => {
    if (questStatus === 'not_started') {
      dispatch(getInitQuest(questId));
    }
    if (current.sort) {
      setActiveStep(current.sort - 1)
    }
  }, [questStatus, current, dispatch, questId])

  /**
   * Handlers
   */
  const handleNext = () => {
    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }
    console.log("Вызвался хендлер степпера")
    dispatch(getNextQuest({questId: questId, answer_type: "text", answer: answer}));
    //setActiveStep(current.sort !== questionCount ? current.sort +1 : current.sort)
    //setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setSkipped(newSkipped);
  };

  // const handleBack = () => {
  //setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }
  //
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  // const handleNext = () => {
  //   setActiveStep(1);
  //   setReqId((prevState) => prevState + 1);
  //
  //   if (reqId + 1 > totalQuestsCount) return;
  //
  //   dispatch(getNextQuest(reqId + 1));
  // };

  /**
   * Render
   */

  const renderQuestSteps = () => {
    return isLoading ? <>Loading...</> : (
      <Box sx={{maxWidth: 600}}>
        <Stepper activeStep={activeStep} connector={<></>}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            // if (isStepOptional(index)) {
            // labelProps.optional = (
            //   <Typography variant="caption">Optional</Typography>
            // );
            // }
            // if (isStepSkipped(index)) {
            //   stepProps.completed = false;
            // }
            stepProps.completed = false;
            stepProps.index = activeStep
            // stepProps.connector = <></>
            stepProps.sx = {
              backgroundColor: '#e3e3e3',
              padding: '7px',
              borderRadius: '5px'
            }
            // stepProps.active = true
            return (
              <Step
                key={label}
                {...stepProps}
              >
                <StepLabel {...labelProps} >{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <React.Fragment>
          <Typography sx={{mt: 2, mb: 1}}>{current?.question_content}</Typography>
          <TextField
            required
            fullWidth
            sx={{mb: {xs: 1, sm: 2}, mt: {xs: 3, sm: 4}}}
            id="outlined-basic-answer"
            label="Ваш ответ"
            variant="outlined"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
            <Button
              // color="inherit"
              // disabled={activeStep === 0}
              variant="contained"
              onClick={() => navigate('/panel/available-quests')}
              sx={{mr: 1}}
            >
              Вернуться назад
            </Button>
            <Box sx={{flex: '1 1 auto'}}/>
            {/*{isStepOptional(activeStep) && (*/}
            {/*  <Button color="inherit" onClick={handleSkip} sx={{mr: 1}}>*/}
            {/*    Skip*/}
            {/*  </Button>*/}
            {/*)}*/}
            <Button variant="contained" onClick={handleNext}>
              {activeStep + 1 === questionCount ? 'Завершить' : 'Ответить'}
            </Button>
          </Box>
          {/*<QRScan />*/}
          {/*<Scanner />*/}
        </React.Fragment>
      </Box>
    );
  }

  const renderCompleteQuest = () => (
    <Box sx={{mt: 10, textAlign: 'center'}}>
      <h1>Поздравляем с прохождением квеста!</h1>
      <Button
        fullWidth
        size="large"
        variant="contained"
        onClick={() => navigate("/panel/available-quests")}
        sx={{mt: 5, mr: 1}}
      >
        Вернуться назад
      </Button>
    </Box>
  );

  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="title">Прохождение квеста</h1>
        {questStatus === "finished" ? renderCompleteQuest() : renderQuestSteps()}
      </div>
    </div>
  );
};

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
// import QRScan from "../../components/qrCodeReader/qrCodeReader";
// import {Scanner} from "../../components/qrCodeReader/qrTestReader";
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
    dispatch(getNextQuest({questId: questId, answer_type: "text", answer: answer}));
  };

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
            stepProps.completed = false;
            stepProps.index = activeStep
            stepProps.sx = {
              backgroundColor: '#e3e3e3',
              padding: '7px',
              borderRadius: '5px'
            }
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
              variant="contained"
              onClick={() => navigate('/panel/available-quests')}
              sx={{mr: 1}}
            >
              Вернуться назад
            </Button>
            <Box sx={{flex: '1 1 auto'}}/>

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

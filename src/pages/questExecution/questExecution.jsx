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
// import {ColorLibStepIcon} from "./questExecutionConfig";

export const QuestExecution = () => {
  /**
   * Init data
   */
  const {current, previous, questionCount, isLoading, questStatus, error, test} = useSelector(
    (state) => state.questExecutionReducer
  );
  const [activeStep, setActiveStep] = useState(current?.sort);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = current?.description ? [current?.description] : [''];
  const [reqId, setReqId] = useState(1);
  const [answer, setAnswer] = useState('');
  //   {
  //     "data": {
  //         "current": {
  //             "id": "b26afe64-81e6-4c38-a01a-3cf158e6760a",
  //             "quest_id": "b3a7a108-0b99-4dbe-b990-b41c6013954b",
  //             "sort": 3,
  //             "description": "Шаг 2",
  //             "question_type": "text",
  //             "question_content": "Описание шага 2",
  //             "answer_type": "text"
  //         },
  //         "previous": [
  //             {
  //                 "id": "9168cdec-452e-4467-912b-62ec795ed3e1",
  //                 "quest_id": "b3a7a108-0b99-4dbe-b990-b41c6013954b",
  //                 "sort": 1,
  //                 "description": "Шаг 1",
  //                 "question_type": "text",
  //                 "question_content": "Шаг",
  //                 "answer_type": "text"
  //             },
  //             {
  //                 "id": "3266a79a-0133-452e-846e-8fe0a4424734",
  //                 "quest_id": "b3a7a108-0b99-4dbe-b990-b41c6013954b",
  //                 "sort": 2,
  //                 "description": "Шаг 3",
  //                 "question_type": "text",
  //                 "question_content": "Описание шага 3",
  //                 "answer_type": "text"
  //             }
  //         ],
  //         "question_count": 4,
  //         "quest_status": "in_progress"
  //     }
  // }


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {questId} = useParams();

  /**
   * Lifecycle
   */

  const isStepOptional = (step) => {
    return step === 1;
  };

  // const isStepSkipped = (step) => {
  //   return skipped.has(step);
  // };

  // console.log("TEST", test)
  console.log("!CURRENT STEP", current)
  console.log("!previous", previous)
  console.log("!questionCount", questionCount)
  console.log("!questStatus", questStatus)

  useEffect(() => {
    console.log("!&!", questId)
    console.log("First Effect", questStatus)
    dispatch(getStatusQuest(questId));
    // console.log('error', e)
    // if (e.response.status === 500) {
    //   return questExecutionApi.getStatusQuest(questId);
    // } else {
    //   return rejectWithValue(e.message)
    // }

  }, []);

  useEffect(() => {
    if (questStatus === 'not_started') {
      dispatch(getInitQuest(questId));
    }
  }, [questStatus])

  // useEffect(() => {
  //   setActiveStep('0')
  // }, [current])

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

  const handleBack = () => {
    //setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

  const handleReset = () => {
    setActiveStep(0);
  };

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

  const renderQuestSteps = () => (
    <Box sx={{maxWidth: 600}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption">Optional</Typography>
          //   );
          // }
          // if (isStepSkipped(index)) {
          //   stepProps.completed = false;
          // }
          stepProps.completed = false
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep > current?.questionCount ? (
        <React.Fragment>
          <Typography sx={{mt: 2, mb: 1}}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
            <Box sx={{flex: '1 1 auto'}}/>
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
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
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{mr: 1}}
            >
              Назад
            </Button>
            <Box sx={{flex: '1 1 auto'}}/>
            {/*{isStepOptional(activeStep) && (*/}
            {/*  <Button color="inherit" onClick={handleSkip} sx={{mr: 1}}>*/}
            {/*    Skip*/}
            {/*  </Button>*/}
            {/*)}*/}

            <Button onClick={handleNext}>
              {activeStep === questionCount ? 'Завершить' : 'Следующий'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );

  const renderCompleteQuest = () => (
    <Box sx={{mt: 10}}>
      <h1>Поздравляем с прохождением квеста!</h1>
      <Button
        fullWidth
        size="large"
        variant="contained"
        onClick={() => navigate("/panel")}
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
        {/*{reqId > totalQuestsCount ? renderCompleteQuest() : renderQuestSteps()}*/}
        {renderQuestSteps()}
      </div>
    </div>
  );
};

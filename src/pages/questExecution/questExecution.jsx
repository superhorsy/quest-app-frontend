import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import {getInitQuest, getStatusQuest, getNextQuest} from "../../store/actions/actions";
import {ColorLibStepIcon} from "./questExecutionConfig";

export const QuestExecution = () => {
  /**
   * Init data
   */
  const dispatch = useDispatch();
  const {quests, totalQuestsCount, isLoading, error} = useSelector(
    (state) => state.questExecutionReducer
  );
  const [activeStep, setActiveStep] = useState(0);
  const [reqId, setReqId] = useState(1);
  const navigate = useNavigate();

  const {questId} = useParams();
  console.log("questId", questId);
  // console.log("quests", quests);
  // console.log("totalQuestsCount", totalQuestsCount);
  // console.log("isLoading", isLoading);
  // console.log("error", error);


  /**
   * Lifecycle
   */

  useEffect(() => {
    if (!error) {
      dispatch(getInitQuest(questId));
    }
    console.log("!&!", questId)
    dispatch(getStatusQuest(questId));
    // console.log('error', e)
    // if (e.response.status === 500) {
    //   return questExecutionApi.getStatusQuest(questId);
    // } else {
    //   return rejectWithValue(e.message)
    // }
  }, []);

  /**
   * Handlers
   */

  const handleNext = () => {
    setActiveStep(1);
    setReqId((prevState) => prevState + 1);

    if (reqId + 1 > totalQuestsCount) return;

    dispatch(getNextQuest(reqId + 1));
  };

  /**
   * Render
   */
    //{quests.map(({id, description, question_content, hasAnswer, rightAnswer}) => (
  const renderQuestSteps = () => (
      <Box sx={{maxWidth: 600}}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {quests.map(({id, label, description, hasAnswer, rightAnswer}) => (
            <Step key={id}>
              <StepLabel
                icon={reqId}
                StepIconComponent={(props) =>
                  ColorLibStepIcon(props, {hasAnswer, rightAnswer, id})
                }
              >
                {label}
              </StepLabel>
              <StepContent>
                <Typography>{description}</Typography>
                <TextField
                  fullWidth
                  sx={{marginY: {xs: 2, sm: 2}}}
                  id="outlined-basic"
                  type="password"
                  label="Введите ответ"
                  variant="outlined"
                />
                <Box sx={{mb: 2}}>
                  <div>
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      onClick={handleNext}
                      sx={{mt: 1, mr: 1}}
                    >
                      Следующий шаг
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
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
        {reqId > totalQuestsCount ? renderCompleteQuest() : renderQuestSteps()}
      </div>
    </div>
  );
};

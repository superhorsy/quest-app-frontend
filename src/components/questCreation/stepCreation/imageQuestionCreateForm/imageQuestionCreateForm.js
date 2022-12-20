import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {v4} from 'uuid';

import {addOneStep, editStep} from "../../../../store/reducers/currentQuestSlice";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FileUploader } from "../../../fileUploader/fileUpoader.js";

export const ImageQuestionCreateForm = ({stepData, handleClose}) => {
  const [taskName, setTaskName] = useState(stepData?.description ? stepData.description : "");
  const [taskAnswersString, setTaskAnswersString] = useState(stepData?.answer_content ? stepData.answer_content : "");
  const {questId} = useParams();

  const currentQuest = useSelector(state => state.currentQuestReducer.currentQuest);
  const { media } = useSelector((state) => state.mediaReducer);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isEmptyField = !taskName || !taskAnswersString || !media;

  const onCreateTaskSubmit = (event) => {
    event.preventDefault();

    const arrayOfAnswers = taskAnswersString.toString().toLowerCase().split(",");

    let stepN = stepData ? currentQuest.steps.length : currentQuest.steps.length + 1;

    let step = {
      quest_id: questId,
      id: !stepData ? v4() : stepData.id,
      sort: stepN,
      description: taskName,
      question_type: "image",
      question_content: media.link,
      answer_type: "text",
      answer_content: arrayOfAnswers
    }

    if (!stepData) {
      dispatch(addOneStep(step));
      navigate(`/panel/quest-profile/${questId}`);
    } else {
      dispatch(editStep(step));
      handleClose();
    }
  };

  return (
    <Box
      component="form"
      sx={{
        m: "0 auto",
        mb: {xs: 2, sm: 3},
        textAlign: "center",
        width: {xs: 1 / 1, sm: 500},
      }}
      noValidate={false}
      autoComplete="off"
      onSubmit={onCreateTaskSubmit}
    >
      <TextField
        fullWidth
        id="outlined-basic"
        label="Название задания"
        variant="outlined"
        helperText="Например: Из какого фильма кадр на картинке (не более 255 символов)"
        sx={{mb: {xs: 3, sm: 7}}}
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />

      <TextField
        fullWidth
        id="outlined-basic"
        label="Варианты правильных ответов"
        variant="outlined"
        helperText="Например: один дома, дома один"
        sx={{mb: {xs: 3, sm: 7}}}
        value={taskAnswersString}
        onChange={(e) => setTaskAnswersString(e.target.value)}
      />
      <FileUploader type={"image"} media={media}/>
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isEmptyField}
      >
        Сохранить
      </Button>
    </Box>
  );
};
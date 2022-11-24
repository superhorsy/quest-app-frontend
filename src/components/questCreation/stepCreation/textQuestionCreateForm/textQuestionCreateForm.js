import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addStep } from "../../../../store/reducers/questsSlice";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const TextQuestionCreateForm = () => {

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskAnswersString, setTaskAnswersString] = useState("");
  const [taskAnswersArray, setTaskAnswersArray] = useState([]);

  const { questId } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getArrayOfAnswers = (answers) => {
    const arrayOfAnswers = answers.toLowerCase().split(",");
    setTaskAnswersArray(arrayOfAnswers);
  };

  const isEmptyField = () => {
    return !taskName || !taskDescription || !taskAnswersString;
  };

  const onCreateTaskSubmit = (event) => {
    event.preventDefault();
    getArrayOfAnswers(taskAnswersString);

    const step = {
      id: "jldgdkfgkj jkfdjgdjkfgnkjdnfg",
      quest_id: questId,
      sort: "0",
      description: taskName,
      question_type: "text",
      question_content: taskDescription,
      answer_type: "text",
      answer_content: taskAnswersArray
    }
    dispatch(addStep(step));
    console.log('questId>>>>>>', questId);
    navigate(`/panel/quest-profile/${questId}`);
  };
  return (
    <Box
      component="form"
      sx={{
        m: "0 auto",
        mb: { xs: 2, sm: 3 },
        textAlign: "center",
        width: { xs: 1 / 1, sm: 500 },
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
        helperText="Например: Отгадайте загадку"
        sx={{ mb: { xs: 3, sm: 7 } }}
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <TextField
        fullWidth
        id="outlined-basic"
        label="Описание задания"
        variant="outlined"
        helperText="Например: Зимой и летом одним цветом"
        multiline
        rows={4}
        sx={{ mb: { xs: 3, sm: 7 } }}
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <TextField
        fullWidth
        id="outlined-basic"
        label="варианты ответа"
        variant="outlined"
        helperText="Например: елка,елочка,ёлка,ёлочка"
        sx={{ mb: { xs: 3, sm: 7 } }}
        value={taskAnswersString}
        onChange={(e) => setTaskAnswersString(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isEmptyField()}
      >
        Сохранить
      </Button>
    </Box>
  );
};

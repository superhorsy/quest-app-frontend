import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const TextQuestionEditForm = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskAnswersString, setTaskAnswersString] = useState("");
  const [taskAnswersArray, setTaskAnswersArray] = useState([]);

  const navigate = useNavigate();

  const getArrayOfAnswers = (answers) => {
    const arrayOfAnswers = answers.toLowerCase().split(",");
    setTaskAnswersArray(arrayOfAnswers);
  };

  const isEmptyField = () => {
    return !taskName || !taskDescription || !taskAnswersString;
  };

  const createTask = (event) => {
    event.preventDefault();

    console.log({
      taskName: taskName,
      taskDescription: taskDescription,
      taskAnswersString: taskAnswersString,
    });

    getArrayOfAnswers(taskAnswersString);
    console.log(taskAnswersArray);
    navigate("/panel/quest-profile");
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
      onSubmit={createTask}
    >
      <TextField
        fullWidth
        id="outlined-basic"
        label="Название задания"
        variant="outlined"
        helperText="Например: Отгадайте загадку"
        sx={{ mb: { xs: 3, sm: 7 } }}
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
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <TextField
        fullWidth
        id="outlined-basic"
        label="варианты ответа"
        variant="outlined"
        helperText="Например: елка,елочка,ёлка,ёлочка"
        sx={{ mb: { xs: 3, sm: 7 } }}
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

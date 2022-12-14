import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createQuest } from "../../../store/actions/actions";

export const CreateQuestForm = () => {
  const dispatch = useDispatch();
  const [questName, setQuestName] = useState("");
  const [questDesctiption, setQuestDescription] = useState("");

  const navigate = useNavigate();

  const isEmptyField = !questDesctiption || !questName;

  const handleCreateQuestSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: questName,
      description: questDesctiption,
      steps: [],
      theme: "standart"
    }
    dispatch(createQuest(data))
      .then((data) => {
        const questId = data.payload.data.id;
        navigate(`/panel/quest-profile/${questId}`);
      })
  }


  return (
    <Box
      component="form"
      sx={{
        m: "0 auto",
        textAlign: "center",
        width: { xs: 1 / 1, sm: 500 },
      }}
      noValidate={false}
      autoComplete="off"
      onSubmit={handleCreateQuestSubmit}
    >
      <TextField
        required
        fullWidth
        id="outlined-basic"
        label="Название квеста"
        variant="outlined"
        helperText="Название квеста будет видно в списке квестов"
        sx={{ mb: { xs: 3, sm: 7 } }}
        value={questName}
        onChange={(e) => setQuestName(e.target.value)}
      />
      <TextField
        required
        fullWidth
        id="outlined-basic"
        label="Описание квеста"
        variant="outlined"
        helperText="Описание квеста адресат увидит перед прохождением квеста"
        multiline
        rows={4}
        sx={{ mb: { xs: 3, sm: 7 } }}
        value={questDesctiption}
        onChange={(e) => setQuestDescription(e.target.value)}
      />

      <Button
        sx={{
          width: 200,
          mb: { xs: 2, sm: 3 },
        }}
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

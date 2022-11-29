import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const QuestEditForm = () => {
  const [questName, setQuestName] = useState("");
  const [questDesctiption, setQuestDescription] = useState("");

  const navigate = useNavigate();

  const isEmptyField = !questDesctiption || !questName;

  const createQuest = (event) => {
    event.preventDefault();

    console.log({
      questName: questName,
      questDesctiption: questDesctiption,
    });
    navigate("/panel/quest-profile/");
  };

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
      onSubmit={createQuest}
    >
      <TextField
        required
        fullWidth
        id="outlined-basic"
        label="Название квеста"
        variant="outlined"
        helperText="Название квеста будете видеть только Вы"
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
        Далее
      </Button>
    </Box>
  );
};

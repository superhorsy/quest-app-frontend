import React, { useState } from "react";
import isEmail from "validator/lib/isEmail";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const CreateQuestForm = () => {
  const [questName, setQuestName] = useState("");
  const [questDesctiption, setQuestDescription] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");

  const isEmptyField = () => {
    return !receiverEmail || !questDesctiption || !questName;
  };

  const validateEmail = (email) => {
    if (isEmail(email)) {
      setReceiverEmail(email);
    }
  };

  const createQuest = (event) => {
    event.preventDefault();

    console.log({
      questName: questName,
      questDesctiption: questDesctiption,
      receiverEmail: receiverEmail,
    });
  };

  return (
    <Box
      component="form"
      sx={{
        m: "0 auto",
        textAlign: "center",
        borderBottom: 1,
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
        onChange={(e) => setQuestDescription(e.target.value)}
      />
      <TextField
        required
        type="email"
        fullWidth
        id="outlined-basic"
        label="Почтовый ящик друга"
        variant="outlined"
        sx={{ mb: { xs: 3, sm: 5 } }}
        onChange={(e) => validateEmail(e.target.value)}
      />
      <Button
        sx={{
          mb: { xs: 2, sm: 3 },
        }}
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

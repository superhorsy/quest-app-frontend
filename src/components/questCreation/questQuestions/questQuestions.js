import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const QuestQuestions = () => {
  return (
    <Box
      component="div"
      sx={{
        m: "0 auto",
        mb: { xs: 2, sm: 3 },
        textAlign: "center",
        width: { xs: 1 / 1, sm: 400 },
      }}
    >
      <Button
        fullWidth
        variant="contained"
        size="medium"
        sx={{ mt: 4, py: 2, mb: 1 }}
      >
        Текстовое задание
      </Button>
      <Button
        disabled
        fullWidth
        variant="contained"
        size="medium"
        sx={{ mt: 4, py: 2, mb: 1 }}
      >
        Задание с картинкой
      </Button>
      <Button
        disabled
        fullWidth
        variant="contained"
        size="medium"
        sx={{ mt: 4, py: 2, mb: 1 }}
      >
        Задание с QR-кодом
      </Button>
      <Button
        disabled
        fullWidth
        variant="contained"
        size="medium"
        sx={{ mt: 4, py: 2, mb: 1 }}
      >
        Задание с аудио
      </Button>
    </Box>
  );
};

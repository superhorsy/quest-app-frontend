import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const QuestQuestions = () => {
  const navigate = useNavigate();
  const { questId } = useParams();

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
        onClick={() =>
          navigate(`/panel/create-quest/${questId}/create-step/text-step/`)
        }
      >
        Текстовое задание
      </Button>
      <Button
        fullWidth
        variant="contained"
        size="medium"
        sx={{ mt: 4, py: 2, mb: 1 }}
        onClick={() =>
          navigate(`/panel/create-quest/${questId}/create-step/image-step/`)
        }
      >
        Задание с картинкой
      </Button>
      <Button
        fullWidth
        variant="contained"
        size="medium"
        sx={{ mt: 4, py: 2, mb: 1 }}
        onClick={() =>
          navigate(`/panel/create-quest/${questId}/create-step/qr-step/`)
        }
      >
        Задание с QR-кодом
      </Button>
      <Button
        fullWidth
        variant="contained"
        size="medium"
        sx={{ mt: 4, py: 2, mb: 1 }}
        onClick={() =>
          navigate(`/panel/create-quest/${questId}/create-step/audio-step/`)
        }
      >
        Задание с аудио
      </Button>
    </Box>
  );
};

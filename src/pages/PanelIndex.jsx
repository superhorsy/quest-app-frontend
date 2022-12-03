import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const PanelIndex = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        component="div"
        sx={{
          m: "0 auto",
          textAlign: "center",
          width: { xs: 1 / 1, sm: 200 },
        }}
      >
        <h1>Панель</h1>
        <Box
          component="div"
          sx={{
            m: "0 auto",
            textAlign: "center",
            width: { xs: 1 / 1, sm: 200 },
          }}
        >
          <Button
            fullWidth
            variant="contained"
            size="medium"
            sx={{ mt: 4, mb: { xs: 2, sm: 3 }, py: { xs: 1.5 } }}
            onClick={() => navigate("/panel/create-quest/")}
          >
            Создать квест
          </Button>{" "}
          <Button
            fullWidth
            variant="contained"
            size="medium"
            sx={{ mt: 4, mb: { xs: 2, sm: 3 }, py: { xs: 1.5 } }}
            onClick={() => navigate("/panel/my-quests")}
          >
            Мои квесты
          </Button>
          <Button
            fullWidth
            variant="contained"
            size="medium"
            sx={{ mt: 4, mb: { xs: 2, sm: 3 }, py: { xs: 1.5 } }}
            onClick={() => navigate("/panel/available-quests")}
          >
            Доступные квесты
          </Button>
        </Box>
      </Box>
    </>
  );
};

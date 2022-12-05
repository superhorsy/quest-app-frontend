import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { StepTemplate } from "../questCreation/stepCreation/stepTemplate/stepTemplate";
import { ThemeSelector } from "../questCreation/themeSelector/themeSelector";
import { fetchQuest } from "../../store/actions/actions";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EditIcon from "@mui/icons-material/Edit";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SaveIcon from "@mui/icons-material/Save";
import styles from "./questProfile.module.scss";

import { DragAndDropList } from "../dragAndDropList/dragAndDropList";

export const QuestProfile = () => {
  const currentQuest = useSelector(
    (state) => state.currentQuestReducer.currentQuest
  );

  console.log("currentQuest: >>>>>>>", currentQuest);

  const { questId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuest(questId));
  }, []);

  return (
    <>
      {currentQuest && (
        <>
          <div className={styles.questInfo}>
            <div className={styles.questInfo__item}>
              <div className={styles.questInfo__title}>
                Квест: {currentQuest.name}
              </div>
            </div>
            <div className={styles.questInfo__item}>
              <div className={styles.questInfo__desc}>
                {currentQuest.description}
              </div>
            </div>
            <Box
              component="div"
              sx={{
                m: "0 auto",
                textAlign: "center",
                width: { xs: 150, sm: 200 },
              }}
            >
              <Button
                // disabled
                fullWidth
                variant="contained"
                endIcon={<EditIcon />}
                size="medium"
                onClick={() => navigate("/panel/create-quest/")}
              >
                Редактировать
              </Button>
            </Box>
          </div>

          <div className={styles.step__box}>
            {currentQuest.steps &&
              currentQuest.steps.map((item, ind) => (
                <StepTemplate
                  key={ind}
                  number={item.sort}
                  questionType={item.question_type}
                  description={item.description}
                  questionContent={item.question_content}
                />
              ))}
          </div>
          <ThemeSelector />

          <DragAndDropList />
          <Button
            endIcon={<NoteAddIcon />}
            variant="contained"
            sx={{
              m: "0 auto",
              width: { sx: 1, sm: 300 },
              mt: 3,
              mb: { xs: 1, sm: 2 },
              py: 1,
            }}
            onClick={() =>
              navigate(`/panel/create-quest/${questId}/create-step`)
            }
          >
            Создать шаг
          </Button>
          <Box
            component="div"
            sx={{ mb: 9, display: "flex", justifyContent: "space-around" }}
          >
            <Button
              variant="contained"
              startIcon={<KeyboardBackspaceIcon />}
              sx={{
                width: { xs: 130, sm: 200 },
                mt: 3,
                mb: { xs: 1, sm: 2 },
                py: 1,
              }}
              onClick={() => navigate("/panel")}
            >
              Назад
            </Button>
            <Button
              variant="contained"
              endIcon={<SaveIcon />}
              sx={{
                width: { xs: 130, sm: 200 },
                mt: 3,
                mb: { xs: 1, sm: 2 },
                py: 1,
              }}
              onClick={() => navigate("/panel")}
            >
              Сохранить
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

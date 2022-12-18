import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ThemeSelector } from "../questCreation/themeSelector/themeSelector";
import { fetchQuest, updateQuest } from "../../store/actions/actions";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SaveIcon from "@mui/icons-material/Save";
import styles from "./questProfile.module.scss";

import { DragAndDropList } from "../dragAndDropList/dragAndDropList";
import { Loader } from "../loader/loader.js";
import { ModalQuestProfileEditor } from "./modalQuestProfileEditor";
import { ModalRestorePass } from "../modalResorePass";
import { FinalQuestMessage } from "../finalQuestMessage/finalQuestMessage";

export const QuestProfile = () => {
  const currentQuest = useSelector(
    (state) => state.currentQuestReducer.currentQuest
  );
  const isLoading = useSelector((state) => state.currentQuestReducer.isLoading);

  

  const { questId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const isEmptyField = !questPresentMessage || !setQuestPresentMessage;

  const handleSaveQuest = () => {
    dispatch(updateQuest(currentQuest));
    navigate("/panel/my-quests");
  };

  //
  const changeButton = (button) => {
    button.innerText = "Редактировать";
  }
  //
  useEffect(() => {
    if (!currentQuest?.steps?.length) {
      dispatch(fetchQuest(questId));
    }
    if (currentQuest.id !== questId) {
      dispatch(fetchQuest(questId));
    }
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && currentQuest && (
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
            <ThemeSelector />
            <Box
              component="div"
              sx={{
                m: "0 auto",
                textAlign: "center",
                // width: { xs: 150, sm: 200 },
              }}
            >
              {/* <Button
                disabled
                fullWidth
                variant="text"
                size="medium"
                sx={{ mb: { xs: 2, sm: 3 } }}
                // onClick={() => navigate("/panel/create-quest/")}
              >
                Редактировать
              </Button> */}
              <ModalQuestProfileEditor
                buttonProps={{
                  fullWidth: true,
                  variant: "contained",
                  size: "large",
                  sx: { marginBottom: "20px" },
                }}
                questData={{
                  name: currentQuest.name,
                  description: currentQuest.description,
                }}
              />
            </Box>
          </div>
          <DragAndDropList />
          <FinalQuestMessage />
          {/* <TextField
            required
            fullWidth
            id="outlined-basic"
            label="Здесь можно написать финальное послание другу"
            variant="outlined"
            helperText="Описание послания адресат увидит после прохождением квеста"
            sx={{ mb: { xs: 3, sm: 7 } }}
            value={questPresentMessage}
            onChange={(e) => setQuestPresentMessage(e.target.value)}
          />
          <Button
            //endIcon={<NoteAddIcon />}
            variant="contained"
            //disabled={isEmptyField}
            onClick={changeButton}
            sx={{
              m: "0 auto",
              width: { sx: 1, sm: 300 },
              mt: -5,
              mb: { xs: 1, sm: 2 },
              py: 1,
            }}
          >
            Сохранить послание
          </Button> */}
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
              onClick={() => navigate("/panel/my-quests")}
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
              onClick={handleSaveQuest}
            >
              Сохранить
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

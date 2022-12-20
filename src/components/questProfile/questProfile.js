import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ThemeSelector } from "../questCreation/themeSelector/themeSelector";
import { fetchQuest, updateQuest } from "../../store/actions/actions";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SaveIcon from "@mui/icons-material/Save";
import styles from "./questProfile.module.scss";

import { DragAndDropList } from "../dragAndDropList/dragAndDropList";
import { Loader } from "../loader/loader.js";
import { ModalQuestProfileEditor } from "./modalQuestProfileEditor";
import { ModalRestorePass } from "../modalResorePass";
import { MyModal } from "../MyModal";
import { CouponConstructor } from "../couponConstructor/couponConstructor";

export const QuestProfile = () => {
  const currentQuest = useSelector(
    (state) => state.currentQuestReducer.currentQuest
  );
  const recipients = currentQuest.recipients;
  const currentTheme = currentQuest.theme;

  const isLoading = useSelector((state) => state.currentQuestReducer.isLoading);

  const { questId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSaveQuest = () => {
    dispatch(updateQuest(currentQuest));
    navigate("/panel/my-quests");
  };

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
            <ThemeSelector recipients={recipients} />
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                width: "100%",
                m: "0 auto",
                textAlign: "center",
                // width: { xs: 150, sm: 200 },
              }}
            >
              <ModalQuestProfileEditor
                buttonProps={{
                  fullWidth: true,
                  variant: "contained",
                  size: "large",
                  sx: { marginBottom: "20px" },
                }}
                recipients={recipients}
                questData={{
                  name: currentQuest.name,
                  description: currentQuest.description,
                }}
              />
              <MyModal
                buttonProps={{
                  fullWidth: true,
                  variant: "contained",
                  size: "large",
                  sx: { marginBottom: "20px" },
                }}
                buttonTitle={{
                  title: "Создать купон",
                }}
              >
                <CouponConstructor questTheme={currentTheme} />
              </MyModal>
            </Box>
          </div>
          <DragAndDropList recipients={recipients} />
          <Button
            disabled={recipients?.length > 0}
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
          <Button
            variant="contained"
            sx={{
              m: "0 auto",
              width: { sx: 1, sm: 300 },
              mt: 3,
              mb: { xs: 1, sm: 2 },
              py: 1,
            }}
            onClick={() =>
              navigate(`/questExample/${questId}`)
            }
          >
            Посмотреть результат
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
            {recipients?.length > 0 && (
              <Tooltip
                title="После отправки квеста его нельзя редактировать"
                placement="top"
              >
                <span>
                  <Button
                    disabled={recipients?.length > 0}
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
                </span>
              </Tooltip>
            )}

            {recipients?.length === 0 && (
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
            )}
          </Box>
        </>
      )}
    </>
  );
};

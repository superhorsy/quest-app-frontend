import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ThemeSelector } from "../questCreation/themeSelector/themeSelector";
import { fetchQuest, updateQuest } from "../../store/actions/actions";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SaveIcon from "@mui/icons-material/Save";
import styles from "./questProfile.module.scss";

import { DragAndDropList } from "../dragAndDropList/dragAndDropList";
import { Loader } from "../loader/loader.js";
import { ModalQuestProfileEditor } from "./modalQuestProfileEditor";
import { FinalQuestMessage } from "../finalQuestMessage/finalQuestMessage";
import { MyModal } from "../MyModal";
import { CouponConstructor } from "../couponConstructor/couponConstructor";
import { useLocation } from "react-router-dom";

export const QuestProfile = () => {
  const currentQuest = useSelector(
    (state) => state.currentQuestReducer.currentQuest
  );
  const recipients = currentQuest.recipients;
  const currentTheme = currentQuest.theme;

  const isLoading = useSelector((state) => state.currentQuestReducer.isLoading);

  const { questId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
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
  }, [currentQuest.id, currentQuest?.steps?.length, dispatch, questId]);

  const handleBack = () => {
    console.log(location.key)
    if (location.key === "default") {
      navigate("/panel/my-quests")
    } else {
      navigate(-1)
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && currentQuest && (
        <>
          <div className={styles.questInfo}>
            <div className={styles.questInfo__item}>
              <div className={styles.questInfo__subdesc}>
                Общие данные о квесте
              </div>
            </div>
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
                display: "flex",
                justifyContent: "center",
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
            </Box>
            <ThemeSelector recipients={recipients} />
          </div>
          <div className={styles.questInfo__subdesc}> Создание шагов</div>
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

          <Divider sx={{ backgroundColor: "black", height: 1, mb: 3 }} />

          <div className={styles.questInfo__subdesc}>Награда</div>

          <FinalQuestMessage />
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              width: "100%",
              m: "0 auto",
              textAlign: "center",
              // width: { xs: 150, sm: 200 },
            }}
          >
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

          <Divider sx={{ backgroundColor: "black", height: 1, mb: 3 }} />

          <Box
            component="div"
            sx={{ mb: 4, display: "flex", justifyContent: "space-around" }}
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
              onClick={() => handleBack()}
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
                    color="success"
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
              <Tooltip
                title="Нажмите, чтобы зафиксировать все изменения"
                placement="top"
              >
                <span>
                  <Button
                    color="success"
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
          </Box>
          {currentQuest.steps && (
            <Button
              disabled={currentQuest.steps.length < 1}
              variant="contained"
              sx={{
                m: "0 auto",
                width: { sx: 1, sm: 300 },
                mb: { xs: 1, sm: 2 },
                py: 1,
              }}
              onClick={() => navigate(`/questExample/${questId}`)}
            >
              Посмотреть результат
            </Button>
          )}
        </>
      )}
    </>
  );
};

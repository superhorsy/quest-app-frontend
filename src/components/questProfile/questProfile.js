import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ThemeSelector } from "../questCreation/themeSelector/themeSelector";
import { fetchQuest, updateQuest } from "../../store/actions/actions";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import styles from "./questProfile.module.scss";

import { DragAndDropList } from "../dragAndDropList/dragAndDropList";
import { Loader } from "../loader/loader.js";
import { ModalQuestProfileEditor } from "./modalQuestProfileEditor";
import { FinalQuestMessage } from "../finalQuestMessage/finalQuestMessage";
import { MyModal } from "../MyModal";
import { CouponConstructor } from "../couponConstructor/couponConstructor";
import { useLocation } from "react-router-dom";

export const QuestProfile = () => {
  // const [couponData, setCouponData] = useState({
  //   type: 'coupon',
  //   message: '',
  //   value: '',
  // })
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
                  variant: "text",
                  size: "large",
                  sx: { textDecoration: 'underline' }
                }}
                recipients={recipients}
                questData={{
                  name: currentQuest.name,
                  description: currentQuest.description,
                }}
              />
            </Box>
          </div>
          <Divider sx={{ backgroundColor: "black", opacity: 0.15, height: 1, mb: 4, mt: 2 }} />
          <div className={styles.questBlock}>
            <p className={styles.questBlock__subtitle}>Придайте вашему квесту уникальности:</p>
            <ThemeSelector recipients={recipients} />
          </div>
          <Divider sx={{ backgroundColor: "black", opacity: 0.15, height: 1, mb: 4, mt: 3 }} />
          <div className={styles.questBlock}>
            <div className={styles.questBlock__flex}>
              <p className={styles.questBlock__subtitle}>Шаги квеста:</p>
              <Button
                disabled={recipients?.length > 0}
                endIcon={<AddCircleOutlineIcon />}
                variant="contained"
                color="success"
                size="small"
                onClick={() =>
                  navigate(`/panel/create-quest/${questId}/create-step`)
                }
              >
                Создать шаг
              </Button>
            </div>
            <DragAndDropList recipients={recipients} />
          </div>
          <Divider sx={{ backgroundColor: "black", opacity: 0.15, height: 1, mb: 4, mt: 3 }} />
          <div className={styles.questBlock}>
            <p className={styles.questBlock__subtitle}>Оставьте послание и создайте купон для получателя:</p>
            <FinalQuestMessage />
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <p>
                {!currentQuest.rewards ? 'Вы еще не создали купон:' : 'Купон добавлен!'}
              </p>
              <MyModal
                buttonProps={{
                  fullWidth: true,
                  variant: "text",
                  size: "large",
                  sx: { textDecoration: 'underline', textTransform: 'unset', fontWeight: 600 },
                }}
                buttonTitle={currentQuest.rewards ? {
                  title: "Редактировать купон",
                }
                  : { title: "Создать купон" }}
              >

                <CouponConstructor questTheme={currentTheme} />

              </MyModal>
            </Box>
          </div>
          <Divider sx={{ backgroundColor: "black", opacity: 0.15, height: 1, mb: 4, mt: 3 }} />

          <Box
            component="div"
            sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}
          >
            <Button
              variant="outlined"
              size="large"
              sx={{
                width: '47%',
                mt: 3,
                mb: 1,
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
                <Button
                  disabled={recipients?.length > 0}
                  variant="contained"
                  size="large"
                  sx={{
                    width: '47%',
                    mt: 3,
                    mb: 1,
                    px: 4,
                    py: 2
                  }}
                  onClick={handleSaveQuest}
                >
                  Сохранить
                </Button>
              </Tooltip>
            )}

            {recipients?.length === 0 && (
              <Tooltip
                title="Нажмите, чтобы зафиксировать все изменения"
                placement="top"
              >
                <Button
                  size="large"
                  variant="contained"
                  sx={{
                    width: '47%',
                    mt: 3,
                    mb: 1,
                    px: 4,
                    py: 2
                  }}
                  onClick={handleSaveQuest}
                >
                  Сохранить
                </Button>
              </Tooltip>
            )}
          </Box>
          {currentQuest.steps?.length > 0 && (
            <Button
              variant="text"
              size="large"
              sx={{
                textDecoration: "underline",
                textTransform: "none",
                fontWeight: "600",
                m: "0 auto",
                mb: { xs: 1, sm: 2 },
              }}
              onClick={() => navigate(`/questExample/${questId}`)}
            >
              Как увидит получатель?
            </Button>
          )}
        </>
      )}
    </>
  );
};

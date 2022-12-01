import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { StepTemplate } from "../questCreation/stepCreation/stepTemplate/stepTemplate";
import { ThemeSelector } from "../questCreation/themeSelector/themeSelector";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import styles from "./questProfile.module.scss";

export const QuestProfile = () => {
  const quests = useSelector((state) => state.createdQuestsReducer.quests);
  let { questId } = useParams();

  let currentQuest = quests.find((quest) => quest.id === questId);

  const navigate = useNavigate();

  return (
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
            width: { xs: 1 / 1, sm: 200 },
          }}
        >
          <Button
            disabled
            fullWidth
            variant="contained"
            size="medium"
            sx={{ mt: 4, mb: { xs: 2, sm: 3 }, py: { xs: 1.5 } }}
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
      <Button
        variant="contained"
        size="medium"
        sx={{ mt: 4, mb: { xs: 2, sm: 3 }, py: 2 }}
        onClick={() => navigate(`/panel/create-quest/${questId}/create-step`)}
      >
        Создать шаг
      </Button>
    </>
  );
};

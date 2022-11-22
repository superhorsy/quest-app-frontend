import React from "react";
import { StepTemplate } from "../../components/questCreation/stepCreation/stepTemplate/stepTemplate";
import { SendQuestDialog } from "../../components/questCreation/sendQuestDialog/sendQuestDialog";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import styles from "./questProfilePage.module.scss";

export const QuestProfilePage = () => {

  const navigate = useNavigate();

  const questData = {
    name: "Квест для друга",
    description:
      "Дорогой друг! Сегодня у тебя День Рождения и тебе предстоит выполнить несколько заданий!",
  };
  const data = [
    {
      description: "Отгадай загадку!",
      type: "text",
      number: 1,
    },
    {
      description: "Что изображено на картинке?",
      type: "image",
      number: 2,
    },
    {
      description: "Отгадай загадку!",
      type: "text",
      number: 3,
    },
    {
      description: "Что изображено на картинке?",
      type: "image",
      number: 4,
    },
  ];
  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="title">Профиль квеста</h1>
        <h2 className="subtitle">Общие данные о квесте</h2>
        <div className={styles.questInfo}>
          <div className={styles.questInfo__item}>
            <div className={styles.questInfo__title}>Название квеста:</div>
            <div className={styles.questInfo__desc}>{questData.name}</div>
          </div>
          <div className={styles.questInfo__item}>
            <div className={styles.questInfo__title}>Описание квеста:</div>
            <div className={styles.questInfo__desc}>
              {questData.description}
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
          {data &&
            data.map((item, ind) => (
              <StepTemplate
                key={ind}
                number={item.number}
                questionType={item.type}
                description={item.description}
              />
            ))}
        </div>
        <Button
          variant="contained"
          size="medium"
          sx={{ mt: 4, mb: { xs: 2, sm: 3 }, py: 2 }}
          onClick={() => navigate("/panel/create-quest/create-step")}
        >
          Создать шаг
        </Button>
        <SendQuestDialog />
      </div>
    </div>
  );
};

import React from "react";
import { StepTemplate } from "../../components/questCreation/stepCreation/stepTemplate/stepTemplate";
import { CreateQuestForm } from "../../components/questCreation/questCreateForm/questCreateForm";

import styles from "./createQuestPage.module.scss";

import Button from "@mui/material/Button";

export const CreateQuestPage = () => {
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
      <div className="temporary-header" />

      <div className="main-container">
        <h1 className="title">Создание квеста</h1>

        <CreateQuestForm />
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
        >
          Создать шаг
        </Button>
      </div>
    </div>
  );
};

import React from "react";
import { QuestQuestions } from "../../components/questCreation/questQuestions/questQuestions";

export const QuestionsPage = () => {
  return (
    <div className="page-container">
      <div className="temporary-header" />
      <div className="main-container">
        <h1 className="title">Создание шага</h1>
        <QuestQuestions />
      </div>
    </div>
  );
};

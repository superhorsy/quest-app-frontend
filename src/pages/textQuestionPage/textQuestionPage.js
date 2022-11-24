import React from "react";
import { TextQuestionCreateForm } from "../../components/questCreation/stepCreation/textQuestionCreateForm/textQuestionCreateForm";


export const TextQuestionPage = () => {
  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="title">
          Создание
          <br /> текстового
          <br /> вопроса
        </h1>
        <TextQuestionCreateForm />
      </div>
    </div>
  );
};

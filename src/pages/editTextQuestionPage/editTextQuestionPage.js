import React from "react";
import { TextQuestionEditForm } from "../../components/questEdition/stepEdition/textQuestionEditForm/textQuestionEditForm";


export const EditTextQuestionPage = () => {
  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="title">
          Редактирование
          <br /> текстового
          <br /> вопроса
        </h1>
        <TextQuestionEditForm />
      </div>
    </div>
  );
};

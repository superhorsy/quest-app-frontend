import React from "react";
import { ImageQuestionCreateForm } from "../../components/questCreation/stepCreation/imageQuestionCreateForm/imageQuestionCreateForm";


export const ImageQuestionPage = () => {
  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="title">
          Создание
          <br /> задания с
          <br /> картинкой
        </h1>
        <ImageQuestionCreateForm />
      </div>
    </div>
  );
};
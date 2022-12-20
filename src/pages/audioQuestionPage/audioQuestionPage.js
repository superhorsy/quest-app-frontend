import React from "react";
import { AudioQuestionCreateForm } from "../../components/questCreation/stepCreation/audioQuestionCreateForm/audioQuestionCreateForm";


export const AudioQuestionPage = () => {
  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="title">
          Создание
          <br /> задания с
          <br /> аудио
        </h1>
        <AudioQuestionCreateForm />
      </div>
    </div>
  );
};
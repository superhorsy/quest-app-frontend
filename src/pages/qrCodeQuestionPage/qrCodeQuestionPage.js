import React from "react";
import { QRQuestionCreateForm } from "../../components/questCreation/stepCreation/qrQuestionCreateForm/qrQuestionCreateForm";


export const QRCodeQuestionPage = () => {
  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="title">
          Создание
          <br /> задания с
          <br /> QR-кодом
        </h1>
        <QRQuestionCreateForm />
      </div>
    </div>
  );
};
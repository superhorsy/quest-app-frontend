import React from "react";

import { QuestEditForm } from "../../components/questEdition/questEditForm/questEditForm";

export const EditCreateQuestPage = () => {
  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="title">Редактирование квеста</h1>
        <h2 className="subtitle">Общие данные о квесте</h2>
        <QuestEditForm />
      </div>
    </div>
  );
};

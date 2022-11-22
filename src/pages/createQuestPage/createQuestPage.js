import React from "react";

import { CreateQuestForm } from "../../components/questCreation/questCreateForm/questCreateForm";

export const CreateQuestPage = () => {
  
  return (
    <div className="page-container">
      <div className="temporary-header" />

      <div className="main-container">
        <h1 className="title">Создание квеста</h1>
        <h2 className="subtitle">Общие данные о квесте</h2>
        <CreateQuestForm />
      </div>
    </div>
  );
};

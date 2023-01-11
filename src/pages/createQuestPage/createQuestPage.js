import React from "react";

import { CreateQuestForm } from "../../components/questCreation/questCreateForm/questCreateForm";

export const CreateQuestPage = () => {

  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="title">Создание квеста</h1>
        <CreateQuestForm />
      </div>
    </div>
  );
};

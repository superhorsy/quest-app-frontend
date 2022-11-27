import React from "react";
import { QuestProfile } from "../../components/questProfile/questProfile";

export const QuestProfilePage = () => {

  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="title">Профиль квеста</h1>
        <QuestProfile />
      </div>
    </div>
  );
};

import React from "react";
import { Header } from "../../Header/Header";
import { LinksFooter } from "../../linksFooter/linksFooter";
import { QuestExecution } from "../../../pages/questExecution/newStepper/newStepper";

export const StandartPage = () => {
  return (
    <>
      <Header />
      <QuestExecution />
      <LinksFooter />
    </>
  );
};

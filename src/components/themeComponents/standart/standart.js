import React, { useState, useEffect } from "react";
import { Header } from "../../Header/Header";
import { LinksFooter } from "../../linksFooter/linksFooter";
import { QuestExecution } from "../../../pages/questExecution/newStepper/newStepper";
import { QuestionsSlider } from "../../questionsSlider/questionsSlider";

export const StandartPage = ({ example }) => {
  const [isExample, setIsExample] = useState();

  useEffect(() => {
    if (example) {
      setIsExample(true);
    } else {
      setIsExample(false);
    }
  }, []);
  return (
    <>
      <Header />
      {isExample ? <QuestionsSlider />: <QuestExecution />}
      <LinksFooter />
    </>
  );
};

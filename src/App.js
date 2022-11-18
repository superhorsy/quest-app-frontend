import React from 'react';

import { CreateQuestPage } from "./pages/createQuestPage/createQuestPage";
import { QuestionsPage } from "./pages/questionsPage/questionsPage";
import { TextQuestionPage } from "./pages/textQuestionPage/textQuestionPage";

import "./App.scss";

function App() {
    return (
        <div className="App">
            <CreateQuestPage />
            <QuestionsPage />
            <TextQuestionPage />
        </div>
    );
}

export default App;

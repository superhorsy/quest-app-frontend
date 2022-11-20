import React from 'react';
import {LoginPage, PassRecoveryPage, SignUpPage, StartPage} from "./pages";

//Styles
import "./App.scss";

import {TestComponent} from "./components/testComponent/testComponent";

import { CreateQuestPage } from "./pages/createQuestPage/createQuestPage";
import { QuestionsPage } from "./pages/questionsPage/questionsPage";
import { TextQuestionPage } from "./pages/textQuestionPage/textQuestionPage";

import "./App.scss";

function App() {
    return (
        <div className="App">
            {/*<StartPage/>*/}
            {/*<LoginPage/>*/}
            {/*<SignUpPage/>*/}
            {/*<PassRecoveryPage/>*/}
            {/*<TestComponent/>*/}
            <CreateQuestPage />
            <QuestionsPage />
            <TextQuestionPage />
        </div>
    );
}

export default App;

import React from 'react';
//Styles
import "./App.scss";

import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components/AppRouter';
import { CreateQuestPage } from "./pages/createQuestPage/createQuestPage";
import { QuestProfilePage } from './pages/questProfilePage/questProfilePage';

import "./App.scss";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AppRouter />
                <CreateQuestPage />
                {/* <QuestProfilePage /> */}
            </BrowserRouter>
        </div>
    );
}

export default App;

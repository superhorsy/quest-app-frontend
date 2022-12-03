import React from "react";
import {Route, Routes} from "react-router-dom";

//AUTH PAGES
import {LoginPage, SignUpPage, StartPage, PassRecoveryPage} from "../pages";

//PROFILE PAGES
import {Profile} from "../pages/Profile";
import {ProfileIndex} from "../pages/ProfileIndex";
import {ChangePass} from "../pages/ChangePass";

//PANEL PAGES
import {Panel} from "../pages/Panel";
import {PanelIndex} from "../pages/PanelIndex";
import {AvailableQuests} from "../pages/AvailableQuests";
import {QuestProgress} from "../pages/QuestProgress";
import {UserQuests} from "../pages/UserQuests";
import {CreateQuest} from "../pages/CreateQuest";
import {CreateStep} from "../pages/CreateStep";
import {CreateStepIndex} from "../pages/CreateStepIndex";
import {CreateStepForm} from '../pages/CreateStepForm';
import {QuestProfileTemplate} from "../pages/QuestProfileTemplate";
import {QuestProfileIndex} from "../pages/QuestProfileIndex";
import {TextQuestionStep} from "../pages/TextQuestionStep";
import {QRQuestionStep} from "../pages/QRQuestionStep";


import { DecoratedPage } from "../pages/themes/decoratedPage/decoratedPage";

import {Header} from "./Header/Header";
import {QuestExecution} from "../pages/questExecution/questExecution";
import {FooterTest} from "./footer/footerTest";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<><Header/><FooterTest /></>}>
        <Route index element={<StartPage/>}/>
        <Route path="/signin" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/restore" element={<PassRecoveryPage/>}/>
        <Route path="panel" element={<Panel/>}>
          <Route index element={<PanelIndex/>}/>
          <Route path="available-quests" element={<AvailableQuests/>}/>
          <Route path="my-progress" element={<QuestProgress/>}/>
          <Route path="my-quests" element={<UserQuests/>}/>
          <Route path="create-quest" element={<CreateQuest/>}/>
          <Route path="create-quest/:questId" element={<CreateStep/>}/>
          <Route path="create-quest/:questId/create-step" element={<CreateStepIndex/>}/>
          <Route path="create-quest/:questId/create-step/text-step" element={<TextQuestionStep/>} />
          <Route path="create-quest/:questId/create-step/qr-step" element={<QRQuestionStep/>} />
          <Route path="quest-profile" element={<QuestProfileTemplate/>}>
            <Route path=":questId" element={<QuestProfileIndex/>}/>
          </Route>
          <Route path="profile" element={<Profile/>}>
            <Route index element={<ProfileIndex/>}/>
            <Route path="change-password" element={<ChangePass/>}/>
          </Route>
        </Route>
        <Route path="questExecution" element={<QuestExecution/>}/>
        <Route path="*" element={<h1>Ошибка 404</h1>}/>
      </Route>
      <Route path="/questExecution_decorated" element={<DecoratedPage />} />
    </Routes>
  );
};

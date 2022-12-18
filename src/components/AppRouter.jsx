import React from "react";
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
//AUTH PAGES
import {LoginPage, PassRecoveryPage, SignUpPage, StartPage} from "../pages";

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
import {QuestProfileTemplate} from "../pages/QuestProfileTemplate";
import {QuestProfileIndex} from "../pages/QuestProfileIndex";
import {TextQuestionStep} from "../pages/TextQuestionStep";
import {QRQuestionStep} from "../pages/QRQuestionStep";


import {DecoratedPage} from "../pages/themes/decoratedPage/decoratedPage";

import {Header} from "./Header/Header";
import {QuestExecution} from "../pages/questExecution/newStepper/newStepper.js";
import {FooterTest} from "./footer/footerTest";
import {ErrorWindow} from "./ErrorWindow/ErrorWindow";
import {PrivateRoute, PublicRoute} from "./routes";

export const routes = (isAuth) => createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<>
        <Header/>
        <ErrorWindow/>
        <FooterTest/>
      </>
      }>
        <Route index element={<StartPage/>}/>
        <Route path="/signin" element={<PublicRoute isAuth={isAuth}><LoginPage/></PublicRoute>} handle={{crumb: () => ({name: "Вход", href: "/signin"})}}/>
        <Route path="/signup" element={<PublicRoute isAuth={isAuth}><SignUpPage/></PublicRoute>}
          handle={{crumb: () => ({name: "Регистрация", href: "/signup"})}}/>
        <Route path="/restore" element={<PublicRoute isAuth={isAuth}><PassRecoveryPage/></PublicRoute>}
          handle={{crumb: () => ({name: "Восстановить пароль", href: "/restore"})}}/>
        <Route path="/panel" element={<PrivateRoute isAuth={isAuth}><Panel/></PrivateRoute>} handle={{crumb: () => ({name: "Панель", href: "/panel"})}}>
          <Route index element={<PrivateRoute isAuth={isAuth}><PanelIndex/></PrivateRoute>}/>
          <Route path="available-quests" element={<PrivateRoute isAuth={isAuth}><AvailableQuests/></PrivateRoute>}
            handle={{crumb: () => ({name: "Доступные квесты", href: "/panel/available-quests"})}}/>
          <Route path="my-progress" element={<PrivateRoute isAuth={isAuth}><QuestProgress/></PrivateRoute>}
            handle={{crumb: () => ({name: "Прогресс", href: "/panel/my-progress"})}}/>
          <Route path="my-quests" element={<PrivateRoute isAuth={isAuth}><UserQuests/></PrivateRoute>}
            handle={{crumb: () => ({name: "Мои квесты", href: "/panel/my-quests"})}}/>
            <Route path="create-quest" element={<PrivateRoute isAuth={isAuth}><CreateQuest/></PrivateRoute>}
            handle={{crumb: () => ({name: "Создать квест", href: "/panel/create-quest"})}}/>
            <Route path="create-quest/:questId" element={<PrivateRoute isAuth={isAuth}><CreateStep/></PrivateRoute>}/>
            <Route path="create-quest/:questId/create-step" element={<PrivateRoute isAuth={isAuth}><CreateStepIndex/></PrivateRoute>}
            handle={{crumb: () => ({name: "Создать шаг", href: "#"})}}/>
          <Route path="create-quest/:questId/create-step/text-step" element={<PrivateRoute isAuth={isAuth}><TextQuestionStep/></PrivateRoute>}
            handle={{crumb: () => ({name: "Текстовый квест", href: "#"})}}/>
          <Route path="create-quest/:questId/create-step/qr-step" element={<PrivateRoute isAuth={isAuth}><QRQuestionStep/></PrivateRoute>}
            handle={{crumb: () => ({name: "QR квест", href: "#"})}}/>
          <Route path="quest-profile" element={<PrivateRoute isAuth={isAuth}><QuestProfileTemplate/></PrivateRoute>}
            handle={{crumb: () => ({name: "Профиль квеста", href: "#"})}}>
            <Route path=":questId" element={<PrivateRoute isAuth={isAuth}><QuestProfileIndex/></PrivateRoute>}/>
          </Route>
          <Route path="profile" element={<PrivateRoute isAuth={isAuth}><Profile/></PrivateRoute>}
            handle={{crumb: () => ({name: "Профиль", href: "/panel/profile"})}}>
            <Route index element={<PrivateRoute isAuth={isAuth}><ProfileIndex/></PrivateRoute>}/>
            <Route path="change-password" element={<PrivateRoute isAuth={isAuth}><ChangePass/></PrivateRoute>} handle={{
              crumb: () => ({
                name: "Изменить пароль",
                href: "/panel/profile/change-password"
              })
            }}/>
          </Route>
        </Route>
        <Route path="/questExecution/:questId" element={<PrivateRoute isAuth={isAuth}><QuestExecution /></PrivateRoute>} />
        <Route path="*" element={<h1>Ошибка 404</h1>} handle={{ crumb: () => ({ name: "Ошибка 404", href: "*" }) }} />
      </Route>
      <Route path="/questExecution_decorated/:questId" element={<PrivateRoute isAuth={isAuth}><DecoratedPage /></PrivateRoute>} />
    </>
  )
);

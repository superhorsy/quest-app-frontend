import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
//AUTH PAGES
import { LoginPage, PassRecoveryPage, SignUpPage, StartPage } from "../pages";

//PROFILE PAGES
import { Profile } from "../pages/Profile";
import { ProfileIndex } from "../pages/ProfileIndex";
import { ChangePass } from "../pages/ChangePass";

//PANEL PAGES
import { Panel } from "../pages/Panel";
import { PanelIndex } from "../pages/PanelIndex";
import { AvailableQuests } from "../pages/AvailableQuests";
import { QuestProgress } from "../pages/QuestProgress";
import { UserQuests } from "../pages/UserQuests";
import { CreateQuest } from "../pages/CreateQuest";
import { CreateStep } from "../pages/CreateStep";
import { CreateStepIndex } from "../pages/CreateStepIndex";
import { QuestProfileTemplate } from "../pages/QuestProfileTemplate";
import { QuestProfileIndex } from "../pages/QuestProfileIndex";
import { TextQuestionStep } from "../pages/TextQuestionStep";
import { QRQuestionStep } from "../pages/QRQuestionStep";
import { QuestInfo } from "../pages/QuestInfo";



import { DecoratedPage } from "../pages/themes/decoratedPage/decoratedPage";

import { Header } from "./Header/Header";
import { QuestExecution } from "../pages/questExecution/newStepper/newStepper.js";
import { FooterTest } from "./footer/footerTest";
import { ErrorWindow } from "./ErrorWindow/ErrorWindow";
import { PublicRoute } from "./routes";

export const routes = (isAuth) => createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<>
        <Header />
        <ErrorWindow />
        <FooterTest />
      </>
      }>
        <Route index element={<StartPage />} />
        <Route path="/signin" element={<PublicRoute isAuth={isAuth}><LoginPage /></PublicRoute>} handle={{ crumb: () => ({ name: "Вход", href: "/signin" }) }} />
        <Route path="/signup" element={<PublicRoute isAuth={isAuth}><SignUpPage /></PublicRoute>}
          handle={{ crumb: () => ({ name: "Регистрация", href: "/signup" }) }} />
        <Route path="/restore" element={<PublicRoute isAuth={isAuth}><PassRecoveryPage /></PublicRoute>}
          handle={{ crumb: () => ({ name: "Восстановить пароль", href: "/restore" }) }} />
        <Route path="/panel" element={<Panel />} handle={{ crumb: () => ({ name: "Панель", href: "/panel" }) }}>
          <Route index element={<PanelIndex />} />
          <Route path="available-quests" element={<AvailableQuests />}
            handle={{ crumb: () => ({ name: "Доступные квесты", href: "/panel/available-quests" }) }} />
          <Route path="quest-info/:questId" element={<QuestInfo />}
            handle={{ crumb: () => ({ name: "О квесте", href: "/panel/quest-info" }) }} />
          <Route path="my-progress" element={<QuestProgress />}
            handle={{ crumb: () => ({ name: "Прогресс", href: "/panel/my-progress" }) }} />
          <Route path="my-quests" element={<UserQuests />}
            handle={{ crumb: () => ({ name: "Мои квесты", href: "/panel/my-quests" }) }} />
          <Route path="create-quest" element={<CreateQuest />}
            handle={{ crumb: () => ({ name: "Создать квест", href: "/panel/create-quest" }) }} />
          <Route path="create-quest/:questId" element={<CreateStep />} />
          <Route path="create-quest/:questId/create-step" element={<CreateStepIndex />}
            handle={{ crumb: () => ({ name: "Создать шаг", href: "#" }) }} />
          <Route path="create-quest/:questId/create-step/text-step" element={<TextQuestionStep />}
            handle={{ crumb: () => ({ name: "Текстовый квест", href: "#" }) }} />
          <Route path="create-quest/:questId/create-step/qr-step" element={<QRQuestionStep />}
            handle={{ crumb: () => ({ name: "QR квест", href: "#" }) }} />
          <Route path="quest-profile" element={<QuestProfileTemplate />}
            handle={{ crumb: () => ({ name: "Профиль квеста", href: "#" }) }}>
            <Route path=":questId" element={<QuestProfileIndex />} />
          </Route>
          <Route path="profile" element={<Profile />}
            handle={{ crumb: () => ({ name: "Профиль", href: "/panel/profile" }) }}>
            <Route index element={<ProfileIndex />} />
            <Route path="change-password" element={<ChangePass />} handle={{
              crumb: () => ({
                name: "Изменить пароль",
                href: "/panel/profile/change-password"
              })
            }} />
          </Route>
        </Route>
        <Route path="/questExecution/:questId" element={<QuestExecution />} />
        <Route path="*" element={<h1>Ошибка 404</h1>} handle={{ crumb: () => ({ name: "Ошибка 404", href: "*" }) }} />
      </Route>
      <Route path="/questExecution_decorated/:questId" element={<DecoratedPage />} />
    </>
  )
);

import axios from "axios";
import {apiTest} from "../constants/constants";
import { apiQuests } from "../constants/constants";
import {nextQuestResponse} from "./questExecutionApiTMP";

const {BASE_URL_TEST, POSTS} = apiTest
const { BASE_URL, QUESTS, QUESTS_CREATED, REGISTER, LOGIN, PROFILE } = apiQuests;

const instance_test = axios.create({
  baseURL: BASE_URL_TEST,
});
const instance = axios.create({
  baseURL: BASE_URL,
});


instance.defaults.headers.common['Content-Type'] ='application/json';
// временно., пока нет авторизации
instance.defaults.headers.common['Authorization'] ='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkM2RmNzI0Mi02OWNkLTQ1ZWYtYTczNi04OTI4MWQ1MTg2YjQifQ.1zdpU0XW3RExrx_nfe91Dt45HjGBiO-XcUOkq3s-Odg';

export const testPostsApi = {
  fetchPosts: () => {
    return instance_test.get(POSTS)
  },
  // sendPosts: (posts) => {
  // const data = {
  //     posts
  // }
  //     return instance.post(POSTS, data)
  // }
}

export const questsApi = {
  fetchCreatedQuests: () => {
    return instance.get(QUESTS_CREATED);
  },
  createQuest: (quest) => {
    return instance.post(QUESTS, quest);
  },
  //пока не работает
  deleteQuest: (questId) => {
    return instance.delete(`${QUESTS}/${questId}`);
  },
  // только созданный квест
  updateQuest: (questId, data) => {
    return instance.put(`${QUESTS}/${questId}`, data);
  },
  //? получение какого именно квеста?
  fetchQuest: (questId) => {
    return instance.get( `${QUESTS}/${questId}`);
  },

  //пока не работает
  sendQuest: (questId, data) => {
    return instance.post(`${QUESTS}/${questId}`, data);
  }
};

export const authApi = {
  requsterUser: (userData) => {
    return instance.post(REGISTER, userData);
  },
  loginUser: (loginData) => {
    return instance.post(LOGIN, loginData);
  }
}

export const userProfileApi = {
  fetchUserProfile: () => {
    return instance.get(PROFILE);
  }
}

//Под каждую сущность создаем свою константу апи с методами

export const questExecutionApi = {
  getInitQuest: async () => {
    return {
      quests: [
        {
          id: 1,
          label: 'Отгадайте загадку',
          description: 'Первая загадка. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, et!',
          hasAnswer: false,
          rightAnswer: null
        }
      ],
      totalQuestsCount: 5
    }
  },
  getNextQuest: async (id) => {
    return nextQuestResponse[id]
  }
}

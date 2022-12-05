import axios from "axios";
import {apiQuests, apiTest} from "../constants/constants";
import {nextQuestResponse} from "./questExecutionApiTMP";

const {BASE_URL_TEST, POSTS} = apiTest;
const {BASE_URL, QUESTS, QUESTS_CREATED, REGISTER, LOGIN, PROFILE} = apiQuests;

const instance_test = axios.create({
  baseURL: BASE_URL_TEST,
});

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {'Content-Type': 'application/json'}
});

// инитерцептор на запрос, будет в хедер вшивать аксесс токен
instance.interceptors.request.use((config) => {
  // в хэдер из localStorage добавили токен
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

//интерсептер для обновления аксес токена
//пока не используется, т.к. нет обновления токена
instance.interceptors.response.use((config) => {
  //config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}, async (error) => {
  //получаем оригинальный запрос
  const originalRequest = error.config

  // если у респонса стаутус 401, то делаем запрос  на обновление аксесс токена и записываем его в localStorage
  // так же проверяем что сам конфиг есть и что _isRetry равен false
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    // добавляем оригинальному запросу поле о том, что запрос уже делали, делается это для того чтобы если при
    // обновлении токена вернется еще раз 401 то инттерцептер не зациклился
    originalRequest._isRetry = true;
    try {
      //запрос на обновление токена
      const response = await axios.get(`${BASE_URL}/refresh`, {withCredentials: true});
      // записываем новый токен в localStorage
      localStorage.setItem('token', response.data.accessToken);
      //делаем повторный запрос
      return instance.request(originalRequest)
    } catch (e) {
      console.log("Не авторизован");
    }

  }
  // если if не отработал, то пробрасываем ошибку
  throw error;
})


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
  deleteQuest: (questId) => {
    return instance.delete(`${QUESTS}/${questId}`);
  },
  // только созданный квест
  updateQuest: (questId, data) => {
    return instance.put(`${QUESTS}/${questId}`, data);
  },

  fetchQuest: (questId) => {
    return instance.get(`${QUESTS}/${questId}`);
  },

  sendQuest: (questId, data) => {
    return instance.post(`${QUESTS}/${questId}`, data);
  }
};

export const authApi = {
  //отправляет объект на сервер для регистрации пользователя
  registrationUser: (userData) => {
    return instance.post(REGISTER, userData);
  },
  //для авторизации пользователя
  loginUser: (loginData) => {
    return instance.post(LOGIN, loginData);
  }
}

export const userProfileApi = {
  //для получения профиля пользователя
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

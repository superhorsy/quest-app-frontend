import axios from "axios";
import {apiQuests} from "../constants/constants";
import {nextQuestResponse} from "./questExecutionApiTMP";

const {
    BASE_URL_QUESTS,
    QUESTS,
    LOGIN,
    PROFILE,
    REGISTER
} = apiQuests;

const instance_quests = axios.create({
    baseURL: BASE_URL_QUESTS,
    headers: {'content-type': 'application/json'},
});
console.log('axios', instance_quests)

// instance_quests.defaults.headers.common['Content-Type'] = 'application/json';
// instance_quests.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkM2RmNzI0Mi02OWNkLTQ1ZWYtYTczNi04OTI4MWQ1MTg2YjQifQ.1zdpU0XW3RExrx_nfe91Dt45HjGBiO-XcUOkq3s-Odg';

// нитерцептор на запрос, будет в хедер вшивать аксесс токен
instance_quests.interceptors.request.use((config) => {
    // в хэдер из localStorage добавили токен
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

//интерсептер для обновления аксес токена
//пока не используется, т.к. нет обновления токена
instance_quests.interceptors.response.use((config) => {
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
            const response = await axios.get(`${BASE_URL_QUESTS}/refresh`, {withCredentials: true});
            // записываем новый токен в localStorage
            localStorage.setItem('token', response.data.accessToken);
            //делаем повторный запрос
            return instance_quests.request(originalRequest)
        } catch (e) {
            console.log("Не авторизован")
        }

    }
    // если if не отработал, то пробрасываем ошибку
    throw error;
})

export const testPostsApi = {
    // fetchPosts: () => {
    //     return instance.get(POSTS)
    // },
    // // sendPosts: (posts) => {
    // // const data = {
    // //     posts
    // // }
    // //     return instance.post(POSTS, data)
    // // }
}

// Api для авторизации пользователя
export const loginApi = (data) => {
    return instance_quests.post(LOGIN, data);
}

// Api отправляет объект на сервер для регистрации пользователя
export const registrationApi = (data) => {
    return instance_quests.post(REGISTER, data);
}

// Api для получения профиля пользователя
export const getProfileApi = () => {
    return instance_quests.get(PROFILE, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    );
}

export const questsApi = {
    fetchQuests: () => {
        return instance_quests.get(QUESTS);
    },
    createQuest: (quest) => {
        return instance_quests.post(QUESTS, quest);
    },
};

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
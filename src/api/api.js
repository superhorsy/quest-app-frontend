import axios from "axios";
import {apiTest} from "../constants/constants";

const {BASE_URL, POSTS} = apiTest
//const  uri = 'http://34.28.145.90'
const instance = axios.create({
    baseURL: BASE_URL,
    // baseURL: uri,

});

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
    return instance.post('/api/v1/login', data)
}

// Api отправляет объект на сервер для регистрации пользователя
export const registrationApi = (data) => {
    return instance.post('/api/v1/register', data)
}

// Api для получения профиля пользователя
export const getProfileApi = () => {
    return instance.get('/api/v1/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    );
}

//Под каждую сущность создаем свою константу апи с методами
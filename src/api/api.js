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

export const loginApi = (data) => {
    return instance.post('/api/v1/login', data)
}

// Апи отправляет объект на сервер для регистрации пользователя
export const registrationApi = (data) => {
    return instance.post('/api/v1/register', data)
}

//Под каждую сущность создаем свою константу апи с методами
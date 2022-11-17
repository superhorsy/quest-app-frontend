import axios from "axios";
import {apiTest} from "../constants/constants";

const {BASE_URL, POSTS} = apiTest

const instance = axios.create({
    baseURL: BASE_URL,
});

export const testPostsApi = {
    fetchPosts: () => {
        return instance.get(POSTS)
    },
    // sendPosts: (posts) => {
    // const data = {
    //     posts
    // }
    //     return instance.post(POSTS, data)
    // }
}

//Под каждую сущность создаем свою константу апи с методами
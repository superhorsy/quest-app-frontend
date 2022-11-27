import axios from "axios";
import {apiTest} from "../constants/constants";
import {nextQuestResponse} from "./questExecutionApiTMP";

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
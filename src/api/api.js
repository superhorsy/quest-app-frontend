import axios from "axios";
import {apiTest} from "../constants/constants";
import { apiQuests } from "../constants/constants";

const {BASE_URL, POSTS} = apiTest
const { BASE_URL_QUESTS, QUESTS } = apiQuests;

const instance = axios.create({
  baseURL: BASE_URL,
});
const instance_quests = axios.create({
  baseURL: BASE_URL_QUESTS,
});

instance_quests.defaults.headers.common['Content-Type'] ='application/json';
instance_quests.defaults.headers.common['Authorization'] ='Basic dGVzdDp0ZXN0';

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

export const questsApi = {
  fetchQuests: () => {
    return instance_quests.get(QUESTS);
  },
  createQuest: (quest) => {
    return instance_quests.post(QUESTS, quest);;
  },
};

//Под каждую сущность создаем свою константу апи с методами

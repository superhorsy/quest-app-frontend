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
instance_quests.defaults.headers.common['Authorization'] ='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkM2RmNzI0Mi02OWNkLTQ1ZWYtYTczNi04OTI4MWQ1MTg2YjQifQ.1zdpU0XW3RExrx_nfe91Dt45HjGBiO-XcUOkq3s-Odg';

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

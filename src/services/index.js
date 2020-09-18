import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import { API_URL } from './config';

export default {
    init() {
        Vue.use(VueAxios, axios),
        Vue.axios.defaults.baseURL = API_URL;
    },

    get(resource, params = {}) {
        return Vue.axios.get(resource, params);
    },

    post(resource, body) {
        return Vue.axios.post(`${resource}`, body);
    },
};

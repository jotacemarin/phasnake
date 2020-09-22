import actions from './actions';
import mutations from './mutations';

const state = {
    nickname: null,
    score: 0,
    bestScores: [],
    playing: false,
    loading: false,
    response: null,
    errors: null,
};

const getters = {
    nickname(state) {
        return state.nickname;
    },
    currentScore(state) {
        return state.score;
    },
    bestScores(state) {
        return state.bestScores;
    },
    isPlaying(state) {
        return state.playing;
    },
    loading(state) {
        return state.loading;
    },
    response(state) {
        return state.response;
    },
    errors(state) {
        return state.errors;
    },
};

export default {
    state,
    actions, 
    mutations,
    getters,
};

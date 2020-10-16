import actions from './actions';
import mutations from './mutations';

const state = {
    nickname: null,
    score: 0,
    bestScores: [],
    lastRn: 0,
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
    lastRn(state) {
        return state.lastRn;
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

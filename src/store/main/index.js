import {
    SET_NICK_ACTION,
    SET_PLAYING_ACTION,
    SET_SCORE_ACTION,
    SEND_NEW_SCORE_ACTION,
    RESET_RESPONSE_ACTION,
} from './actions';
import {
    SET_NICK_MUTATION,
    SET_PLAYING_MUTATION,
    SET_SCORE_MUTATION,
    SEND_NEW_SCORE_SUCCESS_MUTATION,
    SEND_NEW_SCORE_FAILED_MUTATION,
    RESET_RESPONSE_MUTATION,
} from './mutations';
import { ScoresService } from '../../services/scores.service';

const state = {
    nickname: null,
    score: 0,
    playing: false,
    response: null,
    errors: null,
};

const getters = {
    nickname(state) {
        return state.nickname;
    },
    isPlaying(state) {
        return state.playing;
    },
    currentScore(state) {
        return state.score;
    },
    response(state) {
        return state.response;
    },
    errors(state) {
        return state.errors;
    },
};

const actions = {
    [SET_NICK_ACTION](context, payload) {
        return context.commit(SET_NICK_MUTATION, payload);
    },
    [SET_PLAYING_ACTION](context, payload) {
        return context.commit(SET_PLAYING_MUTATION, payload);
    },
    [SET_SCORE_ACTION](context, payload) {
        return context.commit(SET_SCORE_MUTATION, payload);
    },
    [SEND_NEW_SCORE_ACTION](context, payload) {
        return new Promise(resolve => {
            ScoresService.sendNew(payload)
                .then(({ data }) => {
                    context.commit(SEND_NEW_SCORE_SUCCESS_MUTATION, data);
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SEND_NEW_SCORE_FAILED_MUTATION, response.data.errors);
                });
        })
    },
    [RESET_RESPONSE_ACTION](context, payload = null) {
        return context.commit(RESET_RESPONSE_MUTATION, payload);
    },
};

const mutations = {
    [SET_NICK_MUTATION](state, nickname) {
        state.nickname = nickname;
    },
    [SET_PLAYING_MUTATION](state, isPlaying) {
        state.playing = isPlaying;
    },
    [SET_SCORE_MUTATION](state, newScore) {
        state.score = newScore;
    },
    [SEND_NEW_SCORE_SUCCESS_MUTATION](state) {
        state.response = true;
    },
    [SEND_NEW_SCORE_FAILED_MUTATION](state, errors) {
        state.errors = errors;
    },
    [RESET_RESPONSE_MUTATION](state, reset = null) {
        state.response = reset;
        state.errors = reset;
    },
};

export default {
    state,
    actions, 
    mutations,
    getters,
};

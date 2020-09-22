import {
    SET_NICK_MUTATION,
    SET_PLAYING_MUTATION,
    SET_SCORE_MUTATION,
    SET_LOADING_MUTATION,
    REQUEST_SUCCESS_MUTATION,
    REQUEST_FAILED_MUTATION,
    RESET_RESPONSE_MUTATION,
    GET_BEST_SCORES_MUTATION,
} from './mutations';

import { ScoresService } from '../../services/scores.service';

export const SET_NICK_ACTION = "Action.setNick";
export const SET_PLAYING_ACTION = "Action.setPlaying";
export const SET_SCORE_ACTION = "Action.setScore";
export const SET_LOADING_ACTION = "Action.setLoading";
export const SEND_NEW_SCORE_ACTION = 'Action.sendNewScore';
export const RESET_RESPONSE_ACTION = 'Action.resetResponse';
export const GET_BEST_SCORES_ACTION = 'Action.getBestScores';

export const actions = {
    [SET_NICK_ACTION](context, payload) {
        return context.commit(SET_NICK_MUTATION, payload);
    },
    [SET_PLAYING_ACTION](context, payload) {
        return context.commit(SET_PLAYING_MUTATION, payload);
    },
    [SET_SCORE_ACTION](context, payload) {
        return context.commit(SET_SCORE_MUTATION, payload);
    },
    [SET_LOADING_ACTION](context, payload) {
        return context.commit(SET_LOADING_MUTATION, payload);
    },
    [GET_BEST_SCORES_ACTION](context) {
        context.commit(SET_LOADING_MUTATION, true);
        return new Promise(resolve => {
            ScoresService.getBestScores()
                .then(({ data }) => {
                    context.commit(GET_BEST_SCORES_MUTATION, data);
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(REQUEST_FAILED_MUTATION, response.data.errors);
                })
                .finally(() => context.commit(SET_LOADING_MUTATION, false));
        });
    },
    [SEND_NEW_SCORE_ACTION](context, payload) {
        return new Promise(resolve => {
            ScoresService.sendNew(payload)
                .then(({ data }) => {
                    context.commit(REQUEST_SUCCESS_MUTATION);
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(REQUEST_FAILED_MUTATION, response.data.errors);
                })
                .finally(() => context.commit(SET_LOADING_MUTATION, false));
        });
    },
    [RESET_RESPONSE_ACTION](context, payload = null) {
        return context.commit(RESET_RESPONSE_MUTATION, payload);
    },
};

export default actions;
export const SET_NICK_MUTATION = "Mutation.setNick";
export const SET_PLAYING_MUTATION = "Mutation.setPlaying";
export const SET_SCORE_MUTATION = "Mutation.setsCORE";
export const SET_LOADING_MUTATION = "Mutation.setLoading";
export const REQUEST_SUCCESS_MUTATION = "Mutation.requestSuccess";
export const REQUEST_FAILED_MUTATION = "Mutation.requestFailed";
export const RESET_RESPONSE_MUTATION = 'Mutation.resetResponse';
export const GET_BEST_SCORES_MUTATION = 'Mutation.getBestScores';
export const RESET_BEST_SCORES_MUTATION = 'Mutation.resetBestScores';

export const mutations = {
    [SET_NICK_MUTATION](state, nickname) {
        state.nickname = nickname;
    },
    [SET_PLAYING_MUTATION](state, isPlaying) {
        state.playing = isPlaying;
    },
    [SET_SCORE_MUTATION](state, newScore) {
        state.score = newScore;
    },
    [SET_LOADING_MUTATION](state, loading) {
        state.loading = loading;
    },
    [GET_BEST_SCORES_MUTATION](state, payload) {
        state.bestScores = state.bestScores
            .filter(el => el)
            .concat(payload);
        state.lastRn += payload.length;
        state.response = true;
    },
    [REQUEST_SUCCESS_MUTATION](state) {
        state.response = true;
    },
    [REQUEST_FAILED_MUTATION](state, errors) {
        state.errors = errors;
    },
    [RESET_RESPONSE_MUTATION](state, reset = null) {
        state.loading = false;
        state.response = reset;
        state.errors = reset;
    },
    [RESET_BEST_SCORES_MUTATION](state) {
        state.bestScores = [];
        state.lastRn = 0;
    }
};

export default mutations;

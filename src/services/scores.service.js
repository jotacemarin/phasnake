import ApiService from './index';

const RESOURCE = 'scores';

export const ScoresService = {
    sendNew(body) {
        return ApiService.post(RESOURCE, body);
    },

    getBestScores() {
        return ApiService.get(RESOURCE);
    }
};

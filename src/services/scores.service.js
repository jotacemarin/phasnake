import ApiService from './index';

const RESOURCE = 'scores';

export const ScoresService = {
    sendNew(body) {
        return ApiService.post(RESOURCE, body);
    },

    getBestScores(limit = 10, lastRn = 0) {
        return ApiService.get(`${RESOURCE}?limit=${limit}&lastRn=${lastRn}`);
    }
};

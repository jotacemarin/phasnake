import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Game',
        component: async () => await import(/* webpackChunkName: "game" */ '../views/Game'),
    },
    {
        path: '/best-scores',
        name: 'BestScores',
        component: () => import(/* webpackChunkName: "bestScores" */ '../views/BestScores.vue'),
    }
]

const router = new VueRouter({ routes })

export default router

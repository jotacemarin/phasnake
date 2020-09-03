import Vue from 'vue'
import VueRouter from 'vue-router'
import Game from '../views/Game'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Game',
        component: Game
    },
    {
        path: '/best-scores',
        name: 'BestScores',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/BestScores.vue')
    }
]

const router = new VueRouter({ routes })

export default router

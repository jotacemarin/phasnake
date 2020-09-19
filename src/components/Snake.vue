<style lang="scss" scoped>
    #game-screen {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    h2 {
        justify-content: space-between;
    }
</style>
<template>
    <div>
        <div v-if="downloaded">
            <v-card dark>
                <v-container>
                    <v-row>
                        <v-col>
                            <div :id="containerId" />
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-btn text disabled>{{ nickname }} - Score: {{ currentScore }}</v-btn>
                </v-card-actions>
            </v-card>
        </div>
        <GameOverModal :show="modalOpened" :buttons="modalButtons" />
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

import { SET_PLAYING_ACTION, SET_SCORE_ACTION, SEND_NEW_SCORE_ACTION } from '../store/main/actions';
import { emitter } from '../phaser/utils';
import GameOverModal from './GameOverModal';

export default {
    name: 'Snake',

    data: (self = this) => ({
        containerId: 'game-screen',
        downloaded: false,
        gameLibrary: null,
        gameInstance: null,
        modalOpened: false,
        modalButtons: [
            {
                label: 'Retry',
                action: self.retry,
            },
            {
                label: 'Go to best scores',
                action: self.goToBestScores,
            },
        ],
    }),

    components: {
        GameOverModal,
    },

    computed: {
        ...mapGetters(['nickname', 'currentScore']),
    },

    async mounted() {
        this.gameLibrary = await import(/* webpackChunkName: "phaser" */ '../phaser/index');
        emitter.on('eat_food', this.eatFood);
        this.downloaded = true;
        this.$nextTick(async () => this.gameLaunch());
    },
    destroyed() {
        this.gameDestroy();
    },

    methods: {
        gameLaunch() {
            this.gameInstance = this.gameLibrary.launch(this.containerId);
            this.setPlaying(true);
            emitter.once('game_over', this.gameOver);
        },
        gameDestroy(withCanvas = false) {
            if (this.gameInstance) {
                this.gameInstance.destroy(withCanvas);
            }
        },
        gameOver() {
            const { nickname, currentScore: score } = this;
            this.$store.dispatch(SEND_NEW_SCORE_ACTION, { nickname, score });
            this.setPlaying();
            this.modalOpened = true;
        },
        setPlaying(isPlaying = false) {
            this.$store.dispatch(SET_PLAYING_ACTION, isPlaying);
        },
        eatFood(score) {
            this.$store.dispatch(SET_SCORE_ACTION, score);
        },
        retry() {
            this.gameDestroy(true);
            this.gameLaunch();
            this.modalOpened = false;
        },
        goToBestScores() {
            this.$store.dispatch(SET_SCORE_ACTION, 0);
            this.$router.push('/best-scores');
        },
    },
}
</script>
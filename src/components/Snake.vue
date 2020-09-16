<style lang="scss" scoped>
    #game-screen {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
<template>
    <div v-if="downloaded">
        <div :id="containerId" />
    </div>
    <div v-else>
        <span>Loading ...</span>
    </div>
</template>
<script>
import { emitter } from '../phaser/utils';
export default {
    name: 'Snake',

    data: () => ({
        downloaded: false,
        containerId: 'game-screen',
        gameInstance: null,
        gameLibrary: null,
        emitter: null,
    }),

    async mounted() {
        this.windowWidth = this.$el.scrollWidth;
        this.gameLibrary = await import(/* webpackChunkName: "phaser" */ '../phaser/index');
        this.downloaded = true;
        this.$nextTick(async () => this.gameLaunch());
        this.emitter = emitter.on('game_over', this.gameOver);
    },
    destroyed() {
        this.gameDestroy();
    },

    methods: {
        gameLaunch() {
            this.gameInstance = this.gameLibrary.launch(this.containerId);
            return emitter;
        },
        gameDestroy() {
            if (this.gameInstance) {
                this.gameInstance.destroy(false);
            }
        },
        gameOver(total) {
            console.log('method in vue', total);
        }
    },
}
</script>
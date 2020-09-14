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
export default {
    name: 'Snake',

    data: () => ({
        downloaded: false,
        containerId: 'game-screen',
        gameInstance: null,
        gameLibrary: null,
    }),

    async mounted() {
        this.windowWidth = this.$el.scrollWidth;
        this.gameLibrary = await import(/* webpackChunkName: "phaser" */ '../phaser/index');
        this.downloaded = true;
        this.$nextTick(() => this.gameLaunch());
    },
    destroyed() {
        this.gameDestroy();
    },

    methods: {
        gameLaunch() {
            this.gameInstance = this.gameLibrary.launch(this.containerId);
        },
        gameDestroy() {
            if (this.gameInstance) this.gameInstance.destroy(false);
        },
    },
}
</script>
<template>
    <div>
        <h1>This is an best scores page</h1>

        <v-list>
            <template v-if="bestScores.length > 0">
                <v-list-item
                    v-for="(item, i) in bestScores"
                    :key="i"
                    two-line
                >
                    <v-list-item-icon>
                        <v-icon>{{ retrieveIcon(i) }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.nickname }}</v-list-item-title>
                        <v-list-item-subtitle>{{ item.score }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="!loading" @click="getBestScores()" class="cursor-pointer">
                    <v-list-item-icon>
                        <v-icon>mdi-circle-slice-8</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Load more</v-list-item-title>
                        <v-list-item-subtitle>Load more scores</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>

            <template v-else-if="!loading">
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-circle-off-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Empty list</v-list-item-title>
                        <v-list-item-subtitle>Without results</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>

        <v-skeleton-loader 
            v-if="loading"
            type="list-item-avatar-two-line" class="mx-auto"
        />

    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { GET_BEST_SCORES_ACTION, RESET_BEST_SCORES_ACTION } from '../store/main/actions';

export default {
    name: 'BestScore',

    computed: {
        ...mapGetters(['bestScores', 'lastRn', 'loading']),
    },

    beforeCreate() {
        this.$store.dispatch(RESET_BEST_SCORES_ACTION);
    },

    mounted() {
        this.getBestScores();
    },

    methods: {
        retrieveIcon(index) {
            [].length
            return index < 3
                ? `mdi-numeric-${index + 1}-circle-outline`
                : `mdi-circle-outline`;
        },

        getBestScores() {
            this.$store.dispatch(GET_BEST_SCORES_ACTION, { limit: 10, lastRn: this.lastRn });
        }
    },
}
</script>

<style lang="scss" scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>
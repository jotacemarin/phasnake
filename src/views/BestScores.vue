<template>
    <div>
        <h1>This is an best scores page</h1>

        <v-list>
            <v-list-item v-for="(item, i) in best_scores"
                :key="i"
                two-line
            >
                <v-list-item-icon>
                    <v-icon>{{ retrieveIcon(i) }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.score }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>
<script>
export default {
    name: 'BestScore',

    data: () => ({
        best_scores: [
            {
                name: 'dummy',
                score: 0
            },
            {
                name: 'dummy',
                score: 0
            },
            {
                name: 'dummy',
                score: 0
            },
            {
                name: 'dummy',
                score: 0
            },
        ]
    }),

    methods: {
        retrieveIcon(index) {
            return index < 3
                ? `mdi-numeric-${index + 1}-circle-outline`
                : `mdi-circle-outline`;
        },
    },
}
</script>
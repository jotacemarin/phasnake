<style lang="scss" scoped>
    .bordered {
        background: #edf7ff;
        height: 700px;
        overflow-y: scroll;
    }
</style>
<template>
    <Layout>
        <v-tabs icons-and-text grow>
            <v-tab v-for="(link, i) in router_links"
                :key="i"
                :to="link.href"
            >
                {{ link.label }}
                <v-icon>{{ link.icon }}</v-icon>
            </v-tab>
        </v-tabs>
        <div class="bordered">
            <v-container>
                <v-row>
                    <v-col>
                        <router-view />
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </Layout>
</template>
<script>
import Layout from './Layout';

export default {
    name: 'Main',

    components: {
        Layout,
    },

    data: () => ({
        router_links: [
            {
                icon: 'mdi-home',
                href: '/',
                label: 'Game',
            },
            {
                icon: 'mdi-format-list-numbered',
                href: '/best-scores',
                label: 'Best scores',
            },
        ]
    }),
}
</script>
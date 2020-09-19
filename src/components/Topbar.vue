<style lang="scss" scoped>
    .custom-title {
        font-size: 32px;
        font-weight: bold;
    }
</style>
<template>
    <v-app-bar app dark>
        <div class="d-flex align-center">
            <v-img
                alt="Phasnake Logo"
                class="shrink mr-2"
                contain
                transition="scale-transition"
                width="40"
                :src="require('../assets/Fruit.png')"
            />
            <span class="custom-title">Phasnake</span>
        </div>

        <v-spacer></v-spacer>

        <v-btn
            v-for="(link, i) in personal_links"
            :key="i"
            :href="link.href"
            target="_blank"
            icon
        >
            <v-icon>{{ link.icon }}</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    name: 'Topbar',

    data: () => ({
        personal_links: [
            {
                icon: 'mdi-github',
                href: 'https://github.com/jotacemarin',
            },
            {
                icon: 'mdi-linkedin',
                href: 'https://www.linkedin.com/in/julio-c-marin-g/',
            },
        ],
    }),

    methods: {},
}
</script>
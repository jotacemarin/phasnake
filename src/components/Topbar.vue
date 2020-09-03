<template>
    <v-app-bar app dark>
        <div class="d-flex align-center">
            <v-img
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                transition="scale-transition"
                width="40"
                :src="require('../assets/logo.png')"
            />
            <v-img
                alt="Vuetify Name"
                class="shrink mt-1 hidden-sm-and-down"
                contain
                min-width="100"
                width="100"
                src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            />
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
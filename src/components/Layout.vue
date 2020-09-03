<template>
    <v-app>
        <Topbar />

        <v-main>
            <v-container fluid>
                <slot />
            </v-container>
        </v-main>

        <Footer />
    </v-app>
</template>

<script>
import Topbar from './Topbar';
import Footer from './Footer';

export default {
    name: 'Layout',

    components: {
        Topbar,
        Footer,
    },

    data: () => ({}),
}
</script>
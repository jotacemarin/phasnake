<template>
    <v-app>
        <Topbar />

        <v-main>
            <v-container fluid>
                <slot />
            </v-container>
        </v-main>

        <Footer />
        <Snack />
    </v-app>
</template>

<script>
import Topbar from './Topbar';
import Footer from './Footer';
import Snack from './Snack';

export default {
    name: 'Layout',

    components: {
        Topbar,
        Footer,
        Snack,
    },

    data: () => ({}),
}
</script>
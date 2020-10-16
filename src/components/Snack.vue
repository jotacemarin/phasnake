<template>
    <v-snackbar
        v-model="show"
        :color="response ? 'success' : errors ? 'error' : 'info'"
        :timeout="timeout"
        bottom
        right
    >
        {{ response ? 'Success' : errors ? 'Error' : 'Info' }}
    </v-snackbar>
</template>
<script>
import { mapGetters } from 'vuex';
import { RESET_RESPONSE_ACTION } from '../store/main/actions';

export default {
    name: 'Snack',

    data: () => ({
        timeout: 3000,
        show: false,
        color: false,
    }),

    computed: {
        ...mapGetters(['response', 'errors']),
    },

    beforeUpdate() {
        const { response, errors } = this;
        this.show = response || errors;
    },

    updated() {
        setTimeout(this.resetResponse, this.timeout + 50);
    },

    methods: {
        resetResponse() {
            if (this.show) this.$store.dispatch(RESET_RESPONSE_ACTION, null);
        },
    },
}
</script>
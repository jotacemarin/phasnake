<template>
    <div>
        <h1>Snake game</h1>
        <template v-if="!nickname">
            <UserForm />
        </template>
        <template v-else>
            <Snake />
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import UserForm from '../components/UserForm';
import Snake from '../components/Snake';

export default {
    name: 'Home',

    components: {
        UserForm,
        Snake,
    },

    computed: {
        ...mapGetters(['nickname']),
    },
}
</script>

<template>
    <v-dialog v-model="show" max-width="290" persistent>
        <v-card>
            <v-card-title class="headline">
                Game over
            </v-card-title>

            <v-card-text>
                {{ nickname }}, your score was {{ currentScore }}
            </v-card-text>

            <v-card-actions>
                <v-btn
                    v-for="(button, i) in buttons"
                    :key="i"
                    @click="button.action()"
                >
                    {{ button.label }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: 'GameOverModal',

    props: {
        show: {
            type: Boolean,
            default: false,
        },
        buttons: {
            type: Array,
            required: true,
        }
    },

    computed: {
        ...mapGetters(['nickname', 'currentScore']),
    },
}
</script>
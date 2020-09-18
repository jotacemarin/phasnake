<template>
    <v-form ref="userForm" v-model="valid">
        <v-container>
            <v-row justify="center" align="center">
                <v-col cols="6" md="6" sm="12">
                    <v-text-field
                        label="nickname"
                        v-model="nickname"
                        :counter="20"
                        :rules="[v => !!v || 'Nickname is required']"
                        required
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="2" md="2" sm="2">
                    <v-btn
                        color="success"
                        class="mr-4"
                        :disabled="!valid"
                        @click="setNick(nickname)"
                    >
                        Play
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
<script>
import { SET_NICK_ACTION } from '../store/main/actions';

export default {
    name: 'UserForm',

    data: () => ({
        valid: true,
        nickname: '',
    }),

    methods: {
        setNick(nickname) {
            this.$store.dispatch(SET_NICK_ACTION, nickname);
        }
    }
}
</script>
<template>
    <v-footer
        absolute
        class="font-weight-medium"
    >
        <v-col
            class="text-center"
            cols="12"
        >
            {{ new Date().getFullYear() }} — <strong>Julio Marin</strong>
        </v-col>
    </v-footer>
</template>

<script>
export default {
    name: 'Footer',
}
</script>
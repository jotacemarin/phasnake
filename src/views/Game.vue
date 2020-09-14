<template>
    <div>
        <h1>Snake game</h1>
        <Snake />
    </div>
</template>

<script>
import Snake from '../components/Snake';

export default {
    name: 'Home',

    components: {
        Snake,
    },
}
</script>

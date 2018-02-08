<template>
    <p>{{turn}}</p>
</template>

<style rel="stylesheet/scss" href="./style.css" lang="scss" type="text/scss" scoped>

</style>

<script type="text/babel">
    export default {
        computed: {
            turn () {
                return (this.$store.state.gameTurn == 0 ? 'ME' : "OPPONENT(waiting...!)");
            }
        }
    }
</script>

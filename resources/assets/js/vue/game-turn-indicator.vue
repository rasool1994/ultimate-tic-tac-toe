<template>
    <div>
        <p class="turn">Hows Turn? <span>{{ turnString}}</span></p>
    </div>
</template>

<style rel="stylesheet/scss" href="./style.css" lang="scss" type="text/scss" scoped>
    .turn {
        text-align: center;
        margin-top: 130px;
    }
</style>

<script type="text/babel">
    export default {
        data: () => {
            return {};
        },
        computed: {
            turnString(){
                return 'me'
            },
            turnString(){
                return this.$store.state.gameTurn == 0 ? ' me' : ' opponent';
            },
        },
        methods: {

        }
    }
</script>

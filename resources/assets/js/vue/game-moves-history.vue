<template>
    <div class="game-move-history">
        <m-game-move v-for="(move, id) in moves"
                     :key="id"
                     :class="getClass(move)"
                     :id="move.cellId"></m-game-move>
    </div>
</template>

<style rel="stylesheet/scss" href="./style.css" lang="scss" type="text/scss" scoped>
    .game-move-history {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        max-width: 450px;
        margin: 0 10px;
    }
</style>

<script type="text/babel">
    module.exports = {
        data: () => {
            return {}
        },
        computed: {
            moves(){
                return this.$store.state.movesHistory;
            }
        },
        methods: {
            getClass(move){
                switch (move.player) {
                    case -1:
                        return 'clear';
                    case 0:
                        return 'me';
                    case 1:
                        return 'opponent';
                }
            }
        }
    }
</script>

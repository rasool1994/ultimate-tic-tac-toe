<template>
    <div>
        <div class="game-board">
            <m-game-node v-for="(node, nodeId) in nodes"
                         :nodeId="nodeId"
                         :key="nodeId"
                         :cellsStartIndex="nodeId * 9"></m-game-node>
        </div>
    </div>
</template>

<style rel="stylesheet/scss" href="./style.css" lang="scss" type="text/scss" scoped>
    .game-board {
        display: grid;
        grid-gap: 15px;
        grid-template-columns: auto auto auto;
        grid-template-rows: auto auto auto;
        width: 450px;
        margin:0 10px;
    }
</style>

<script type="text/babel">
    import CONSTANT from '../constants'
    import ENUM from '../enums'
    export default {
        data() {
            return {
                nodes: new Array(CONSTANT.NODES_COUNT)
            }
        },
        methods: {},
        computed: {}
    }
</script>

<template>
    <div class="game-node" :class="getClass()">
        <m-game-cell v-for="(cell, cellId) in cells"
                     :key="cellId"
                     :cellId='cellsStartIndex + cellId'></m-game-cell>
    </div>
</template>

<style rel="stylesheet/scss" href="./style.css" lang="scss" type="text/scss" scoped>
    .game-node {
        display: grid;
        grid-gap: 5px;
        grid-template-columns: auto auto auto;
        grid-template-rows: auto auto auto;
        width: 135px;
    }

    .me {
        background-image: url('../../svg/icons8-delete-filled.svg');
        background-size: cover;
    }

    .opponent {
        background-image: url('../../svg/icons8-round-filled.svg');
        background-size: cover;
    }

</style>

<script type="text/babel">
    import {arrayContains} from '../helpers'
    import CONSTANT from '../constants'
    import ENUM from '../enums'
    export default {
        props: ['cellsStartIndex', 'nodeId'],
        data () {
            return {
                cells: new Array(CONSTANT.CELLS_IN_NODE_COUNT)
            }
        },
        methods: {
            getClass(){
                const nodeOwner = this.$store.state.nodesStatus[this.nodeId];
                switch (nodeOwner) {
                    case ENUM.cellStatus.ME:
                        return 'me';
                    case ENUM.cellStatus.OPPONENT:
                        return 'opponent';
                    default :
                        return 'clear';
                }
            }
        }
    }
</script>

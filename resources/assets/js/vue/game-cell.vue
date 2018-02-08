<template>
    <div class="game-cell" :class="ClassObject" @click="onCellClickListener"></div>
</template>

<style rel="stylesheet/scss" href="./style.css" lang="scss" type="text/scss" scoped>

    .game-cell {
        width: 40px;
        height: 40px;
        border: solid 1px rgba(0, 0, 0, 0.6);
        border-radius: 5px;
        cursor: pointer;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    }

    .available-for-me {
        box-shadow: 0 2px 5px 0 rgba(200, 0, 0, 0.7), 0 2px 10px 0 rgba(200, 0, 0, 0.7);

    }

    .available-for-opponent {
        box-shadow: 0 2px 5px 0 rgba(0, 0, 200, 0.7), 0 2px 10px 0 rgba(0, 0, 200, 0.7);
    }

    .clear {

    }

    .me {
        border: none;
        background: url("../../svg/icons8-delete-filled.svg");
        background-size: cover;
    }

    .opponent {
        border: none;
        background: url("../../svg/icons8-round-filled.svg");
        background-size: cover;
    }

</style>

<script type="text/babel">
    import {arrayContains} from '../helpers';
    import CONSTANT from '../constants'
    import ENUM from '../enums'
    export default {
        props: ['cellId'],
        computed: {
            /**
             * @return {Array}
             */
            ClassObject(){
                let classObj = [];
                if (arrayContains(this.$store.state.availableMoves, this.cellId)) {
                    classObj.push(this.$store.state.gameTurn == ENUM.turn.ME ? 'available-for-me' : 'available-for-opponent');
                }
                switch (this.$store.state.cellsStatus[this.cellId]) {
                    case ENUM.cellStatus.ME:
                        classObj.push('me');
                        break;
                    case ENUM.cellStatus.OPPONENT:
                        classObj.push('opponent');
                        break;
                    default :
                        classObj.push('clear');
                }
                return classObj;
            },
        },
        methods: {
            onCellClickListener() {
                if (this.$store.state.boardStatus != ENUM.boardStatus.CLEAR) {
                    this.$toasted.show('<span style="color: red;">game has ended!</span>');
                    return;
                }
                if (this.isCellAvailable()) {
                    // TODO: use dispatch action instead of commit mutation
                    this.$store.commit('play', this.cellId);
                } else {
                    let Toast = this.$toasted.show('<span style="color: red;">selected cell is not available</span>');
                    setTimeout(() => {
                        Toast.text("make another move!").goAway(3999);
                    }, 2000);
                }
            },
            isCellAvailable(){
                return arrayContains(this.$store.state.availableMoves, this.cellId);
            },
            getTurnString(){
                return this.$store.state.gameTurn == 0 ? 'me' : 'opponent';
            },

        }
    }
</script>

import Vue from 'vue'
import Vuex from 'vuex'
import helpers from './helpers'
import ENUM from './enums'
import AI from './tic-tac-toe-player-AI-agent'

Vue.use(Vuex);

/*
 |--------------------------------------------------------------------------
 | create new vuex store instance
 |--------------------------------------------------------------------------
 */

const store = new Vuex.Store({
    state: helpers.getAppInitState(),
    mutations: {
        /**
         * reset store state to default value
         */
        resetGame(state){
            console.log('reinit state');
            state.availableMoves = new Array(81).fill().map((e, i) => i);
            state.gameTurn = ENUM.turn.ME;
            state.cellsStatus = new Array(81).fill().map((e, i) => ENUM.cellStatus.CLEAR);
            state.nodesStatus = new Array(9).fill().map((e, i) => ENUM.nodeStatus.CLEAR);
            state.boardStatus = ENUM.boardStatus.CLEAR;
            state.movesHistory = new Array(81).fill().map((e, i) => {
                return {
                    cellId: i,
                    player: -1
                }
            });
            state.lastMoveId = -1;
            state.gameChannel = '';
            state.movesCount = 0;
            state.options = {
                gameMode: ENUM.gameMode.HUMAN
            };
        },
        playAI(state, moveCellId){
            let nextMove = AI.getNextMove(state, moveCellId);

            const MOVE_NODE_ID = Math.floor(nextMove / 9);
            this.commit({
                type: 'updateCellStatus',
                moveCellId: nextMove,
                gameTurn: state.gameTurn
            });
            this.commit('updateLastMove', nextMove);
            this.commit('updateNodeStatus', MOVE_NODE_ID);
            this.commit('updateBoardStatus');
            this.commit('updateAvailableMoves', nextMove);
            this.commit('addMoveToHistory', nextMove);
            this.commit('increaseMovesCount');
            this.commit('changeGameTurn');
        },
        /**
         * Apply move for current player
         * @param state
         * @param moveCellId
         */
        play(state, moveCellId){
            if (helpers.arrayContains(state.availableMoves, moveCellId)) {
                const MOVE_NODE_ID = Math.floor(moveCellId / 9);
                this.commit({
                    type: 'updateCellStatus',
                    moveCellId: moveCellId,
                    gameTurn: state.gameTurn
                });
                this.commit('updateLastMove', moveCellId);
                this.commit('updateNodeStatus', MOVE_NODE_ID);
                this.commit('updateBoardStatus');
                this.commit('updateAvailableMoves', moveCellId);
                this.commit('addMoveToHistory', moveCellId);
                this.commit('increaseMovesCount');
                this.commit('changeGameTurn');
                if (state.options.gameMode == ENUM.gameMode.AI) {
                    this.commit('playAI', moveCellId);
                }
            } else {
                alert('move is not available');
            }
        },
        updateBoardStatus(state){
            //TODO: react to game end
            if ((helpers.getBoardStatus(state)) != ENUM.boardStatus.CLEAR) {
                alert('game have a winner --->>> player : ' + helpers.getBoardStatus(state));
                state.boardStatus = helpers.getBoardStatus(state);
            }
        },
        /**
         * increaseMovesCount
         * @param state
         */
        increaseMovesCount(state){
            state.movesCount++;
        },
        /**
         *update cell status
         * @param state
         * @param payload
         */
        updateCellStatus(state, payload){
            state.cellsStatus.splice(payload.moveCellId, 1, payload.gameTurn);
        },
        /**
         *updateLastMove
         * @param state
         * @param cellId
         */
        updateLastMove(state, cellId){
            state.lastMoveId = cellId;
        },
        /**
         *updateAvailableMoves
         * @param state
         */
        updateAvailableMoves(state){
            state.availableMoves = helpers.GetAvailableMoves(state, state.lastMoveId);
        },
        /**
         *addMoveToHistory
         * @param state
         * @param cellId
         */
        addMoveToHistory(state, cellId){
            state.movesHistory.splice(state.movesCount, 1, {
                cellId: cellId,
                player: state.gameTurn
            });
        },
        /**
         *changeGameTurn
         * @param state
         */
        changeGameTurn(state){
            state.gameTurn = (state.gameTurn ? 0 : 1);
        },
        /**
         *update node status
         * @param state
         * @param nodeId
         */
        updateNodeStatus(state, nodeId){
            state.nodesStatus.splice(nodeId, 1, helpers.getNodeStatus(state, nodeId));
        },
    }
});

export default store


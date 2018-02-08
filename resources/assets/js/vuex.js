import Vue from 'vue'
import Vuex from 'vuex'
import helpers from './helpers'
import ENUM from './enums'
import CONSTANT from './constants'

Vue.use(Vuex);

/**
 * get available moves for next player
 * @param state
 * @param lastMoveId
 * @returns {Array}
 * @constructor
 */
let GetAvailableMoves = (state, lastMoveId) => {
    const nodesStatus = state.nodesStatus;
    const cellsStatus = state.cellsStatus;
    const nextMoveNodeId = Math.floor(lastMoveId % 9);
    let availableMoves = [];
    //get available moves if next move node is clear
    if (helpers.isNodeClear(nodesStatus, nextMoveNodeId)) {
        const nextNodeFirstCellId = nextMoveNodeId * 9;
        for (let cellID = nextNodeFirstCellId; cellID < nextNodeFirstCellId + CONSTANT.CELLS_IN_NODE_COUNT; cellID++) {
            if (helpers.isCellClear(cellsStatus, cellID)) {
                availableMoves.push(cellID);
            }
        }
        //get available moves if next move node is dirty
    } else {
        for (let cellID = 0; cellID < CONSTANT.CELLS_COUNT; cellID++) {
            const nodeId = Math.floor(cellID / 9);
            if (helpers.isCellClear(cellsStatus, cellID) && helpers.isNodeClear(nodesStatus, nodeId)) {
                availableMoves.push(cellID);
            }
        }
    }
    console.log('info : /vuex.js/ --- [] => GetAvailableMoves() ---->>>> available moves are :');
    console.log(availableMoves);
    return availableMoves;
};

/**
 * is node draw
 * @param state
 * @param nodeId
 * @returns {boolean}
 */
let isNodeDraw = (state, nodeId) => {
    let nodeFirstCellId = nodeId * 9;
    for (let i = nodeFirstCellId; i < nodeFirstCellId + CONSTANT.CELLS_IN_NODE_COUNT; i++) {
        if (helpers.isCellClear(state.cellsStatus, i)) {
            return false;
        }
    }
    return true;
};


/**
 *
 * @param nodesStatus
 * @returns {number}
 */
let getBoardStatus = ({nodesStatus}) => { //es6 argument destruction
    for (let i = 0; i < 3; i++) {
        if (nodesStatus[3 * i] == nodesStatus[3 * i + 1] && nodesStatus[3 * i] == nodesStatus[3 * i + 2] && nodesStatus[3 * i] != ENUM.nodeStatus.CLEAR) {
            return nodesStatus[3 * i];
        }
        if (nodesStatus[i] == nodesStatus[i + 3] && nodesStatus[i] == nodesStatus[i + 6] && nodesStatus[i] != ENUM.nodeStatus.CLEAR) {
            return nodesStatus[i];
        }
    }
    if (nodesStatus[0] == nodesStatus[4] && nodesStatus[0] == nodesStatus[8] && nodesStatus[0] != ENUM.nodeStatus.CLEAR) {
        return nodesStatus[0];
    }

    if (nodesStatus[2] == nodesStatus[4] && nodesStatus[2] == nodesStatus[6] && nodesStatus[2] != ENUM.nodeStatus.CLEAR) {
        return nodesStatus[2];
    }

    return ENUM.boardStatus.CLEAR;
};

/**
 *
 * @param state
 * @param nodeId
 * @returns {*}
 */
let getNodeStatus = (state, nodeId) => {
    const nodeFirstCellId = nodeId * 9;
    const cellsStatus = state.cellsStatus.slice(nodeFirstCellId, nodeFirstCellId + 9);
    for (let i = 0; i < 3; i++) {
        if (cellsStatus[3 * i] == cellsStatus[3 * i + 1] && cellsStatus[3 * i] == cellsStatus[3 * i + 2] && cellsStatus[3 * i] != ENUM.cellStatus.CLEAR) {
            return cellsStatus[3 * i];
        }
        if (cellsStatus[i] == cellsStatus[i + 3] && cellsStatus[i] == cellsStatus[i + 6] && cellsStatus[i] != ENUM.cellStatus.CLEAR) {
            return cellsStatus[i];
        }
    }

    if (cellsStatus[0] == cellsStatus[4] && cellsStatus[0] == cellsStatus[8] && cellsStatus[0] != ENUM.cellStatus.CLEAR) {
        return cellsStatus[0];
    }

    if (cellsStatus[2] == cellsStatus[4] && cellsStatus[2] == cellsStatus[6] && cellsStatus[2] != ENUM.cellStatus.CLEAR) {
        return cellsStatus[2];
    }

    if (isNodeDraw(state, nodeId))
        return ENUM.nodeStatus.DRAW;

    return ENUM.nodeStatus.CLEAR;
};

/*
 |--------------------------------------------------------------------------
 | create new vuex store instance
 |--------------------------------------------------------------------------
 */

const store = new Vuex.Store({
    state: {
        //init vuex state variables
        availableMoves: new Array(81).fill().map((e, i) => i),
        gameTurn: ENUM.turn.ME,
        cellsStatus: new Array(81).fill().map((e, i) => ENUM.cellStatus.CLEAR),
        nodesStatus: new Array(9).fill().map((e, i) => ENUM.nodeStatus.CLEAR),
        boardStatus: ENUM.boardStatus.CLEAR,
        movesHistory: new Array(81).fill().map((e, i) => {
            return {
                cellId: i,
                player: -1 // cells are not played yet so dont have any player
            }
        }),
        lastMoveId: -1,
        movesCount: 0,
        option: {}
    },
    mutations: {
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
            } else {
                alert('move is not available');
            }
        },
        updateBoardStatus(state){
            //TODO: react to game end
            if ((getBoardStatus(state)) != ENUM.boardStatus.CLEAR) {
                alert('game have a winner --->>> player : ' + getBoardStatus(state));
                state.boardStatus = getBoardStatus(state);
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
            state.availableMoves = GetAvailableMoves(state, state.lastMoveId);
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
            state.nodesStatus.splice(nodeId, 1, getNodeStatus(state, nodeId));
        },
    }
});

export default store


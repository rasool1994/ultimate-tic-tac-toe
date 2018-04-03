import ENUM from './enums'
import CONSTANT from './constants'

/**
 * check id needle is exist in array
 * @param array
 * @param needle
 * @returns {boolean}
 */
let arrayContains = (array, needle) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == needle) {
            return true;
        }
    }
    return false;
};

/**
 * is node status CLEAR ?
 * @param nodesStatus
 * @param nodeID
 * @returns {boolean}
 */
let isNodeClear = (nodesStatus, nodeID) => {
    return nodesStatus[nodeID] == ENUM.nodeStatus.CLEAR
};

/**
 * is node status MINE ?
 * @param nodesStatus
 * @param nodeID
 * @returns {boolean}
 */
let isNodeMine = (nodesStatus, nodeID) => {
    return nodesStatus[nodeID] == ENUM.nodeStatus.ME
};

/**
 * is node status OPPONENT ?
 * @param nodesStatus
 * @param nodeID
 * @returns {boolean}
 */
let isNodeOpponent = (nodesStatus, nodeID) => {
    return nodesStatus[nodeID] == ENUM.nodeStatus.OPPONENT
};

/**
 * is node status DRAW ?
 * @param nodesStatus
 * @param nodeID
 * @returns {boolean}
 */
let isNodeDraw = (nodesStatus, nodeID) => {
    return nodesStatus[nodeID] == ENUM.nodeStatus.DRAW
};

/**
 * is cell CLEAR?
 * @param cellsStatus
 * @param cellId
 * @returns {boolean}
 */
let isCellClear = (cellsStatus, cellId) => {
    return cellsStatus[cellId] == ENUM.cellStatus.CLEAR
};

/**
 * is cell MINE?
 * @param cellsStatus
 * @param cellId
 * @returns {boolean}
 */
let isCellMine = (cellsStatus, cellId) => {
    return cellsStatus[cellId] == ENUM.cellStatus.ME
};

/**
 * is cell OPPONENT?
 * @param cellsStatus
 * @param cellId
 * @returns {boolean}
 */
let isCellOpponent = (cellsStatus, cellId) => {
    return cellsStatus[cellId] == ENUM.cellStatus.OPPONENT
};


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
    if (isNodeClear(nodesStatus, nextMoveNodeId)) {
        const nextNodeFirstCellId = nextMoveNodeId * 9;
        for (let cellID = nextNodeFirstCellId; cellID < nextNodeFirstCellId + CONSTANT.CELLS_IN_NODE_COUNT; cellID++) {
            if (isCellClear(cellsStatus, cellID)) {
                availableMoves.push(cellID);
            }
        }
        //get available moves if next move node is dirty
    } else {
        for (let cellID = 0; cellID < CONSTANT.CELLS_COUNT; cellID++) {
            const nodeId = Math.floor(cellID / 9);
            if (isCellClear(cellsStatus, cellID) && isNodeClear(nodesStatus, nodeId)) {
                availableMoves.push(cellID);
            }
        }
    }
    // console.log('info : /vuex.js/ --- [] => GetAvailableMoves() ---->>>> available moves are :');
    // console.log(availableMoves);
    return availableMoves;
};


let getAppInitState = () => {
    return {
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
        gameChannel: '',
        options: {
            gameMode: ENUM.gameMode.HUMAN
        },
    }
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
 * @param cellId
 */
let undoMove = (state, cellId) => {
    state.cellsStatus[cellId] = ENUM.cellStatus.CLEAR;
    let nodeId = Math.floor(cellId / 9);
    state.nodesStatus[nodeId] = getNodeStatus(state, nodeId);
    return state;
};


/**
 *
 * @param state
 * @param cellId
 * @param player
 */
let playCell = (state, cellId, player) => {
    state.cellsStatus[cellId] = player;
    let nodeId = Math.floor(cellId / 9);
    state.nodesStatus[nodeId] = helpers.getNodeStatus(state, nodeId);
    return state;
};

module.exports = {
    arrayContains,
    isNodeClear,
    isNodeDraw,
    isNodeMine,
    isNodeOpponent,
    isCellClear,
    isCellMine,
    isCellOpponent,
    GetAvailableMoves,
    getAppInitState,
    getNodeStatus,
    getBoardStatus,
    undoMove,
    playCell
};


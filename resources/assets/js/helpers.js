import ENUM from './enums'

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


module.exports = {
    arrayContains,
    isNodeClear,
    isNodeDraw,
    isNodeMine,
    isNodeOpponent,
    isCellClear,
    isCellMine,
    isCellOpponent
};


import helpers from './helpers';
import ENUM from './enums';
/**
 *
 * @param a
 * @param b
 * @returns {*}
 */
let getMax = (a, b) => {
    return (a > b ? a : b);
};

/**
 *
 * @param a
 * @param b
 * @returns {*}
 */
let getMin = (a, b) => {
    return (a < b ? a : b);
};

/**
 *
 * @param state
 * @param selectedCellId
 * @param depth
 * @param alpha
 * @returns {number}
 */
let betaPruning = (state, selectedCellId, depth, alpha) => {
    let boardStatus = helpers.getBoardStatus(state);
    let gaveHaveWinner = (boardStatus != ENUM.boardStatus.CLEAR);
    let score = 0;
    let beta = 10000;

    if (gaveHaveWinner) {
        console.log('gaveHaveWinner', boardStatus);
        console.log(state.nodesStatus);
        score = heuristic(state) + (boardStatus == ENUM.boardStatus.ME ? 1000 : -1000);
        return score;
    }

    else if (depth == 0) {
        score = heuristic(state);
        return score;
    }

    let availableMoves = helpers.GetAvailableMoves(state, selectedCellId);

    availableMoves.forEach((cellId) => {
        state = playCell(state, cellId, ENUM.turn.OPPONENT);
        let newBeta = getMin(beta, alphaPruning(state, cellId, depth - 1, beta));
        state = helpers.undoMove(state, cellId);
        if (beta != newBeta) {
            beta = newBeta;
            if (beta < alpha) {
                return beta;
            }
        }
    });

    return beta;
};


/**
 *
 * @param state
 * @param selectedCellId
 * @param depth
 * @param beta
 * @returns {number}
 */
let alphaPruning = (state, selectedCellId, depth, beta) => {
    let boardStatus = helpers.getBoardStatus(state);
    let gaveHaveWinner = (boardStatus != ENUM.boardStatus.CLEAR);
    let score = 0;
    let alpha = -10000;

    if (gaveHaveWinner) {
        console.log('gaveHaveWinner ', selectedCellId);
        console.log(state.cellsStatus);
        score = heuristic(state) + (boardStatus == ENUM.boardStatus.ME ? 1000 : -1000);
        return score;
    }

    else if (depth == 0) {
        score = heuristic(state);
        return score;
    }

    let availableMoves = helpers.GetAvailableMoves(state, selectedCellId);

    availableMoves.forEach((cellId) => {
        state = playCell(state, cellId, ENUM.turn.ME);
        let newAlpha = getMax(alpha, betaPruning(state, cellId, depth - 1, alpha));
        state = helpers.undoMove(state, cellId);
        if (alpha != newAlpha) {
            alpha = newAlpha;
            if (alpha > beta) {
                return alpha;
            }
        }
    });

    return alpha;
};

let heuristic = (state) => {
    let score = 0;
    let i;
    state.nodesStatus.forEach(function (nodeStatus, index) {
        if (nodeStatus != ENUM.nodeStatus.CLEAR && nodeStatus != ENUM.nodeStatus.DRAW) {
            score += (nodeStatus == ENUM.nodeStatus.ME ? 5 : -5);
            if (index == 0 || index == 2 || index == 6 || index == 8) {
                score += (nodeStatus == ENUM.nodeStatus.ME ? 3 : -3);
            } else if (index == 4) {
                score += (nodeStatus == ENUM.nodeStatus.ME ? 10 : -10);
            }
        }
    });

    for (i = 0; i < 9; i++) {
        let centerCellInNode = (i * 9) + 5;
        let centerNodeCellId = 37 + i;
        if (state.cellsStatus[centerCellInNode] != ENUM.cellStatus.CLEAR)
            score += (state.cellsStatus[centerCellInNode] == ENUM.cellStatus.ME ? 3 : -3);
        if (state.cellsStatus[centerNodeCellId] != ENUM.cellStatus.CLEAR)
            score += (state.cellsStatus[centerNodeCellId] != ENUM.cellStatus.ME ? 3 : -3)
    }

    for (i = 0; i < 3; i++) {
        if (state.nodesStatus[i * 3] != ENUM.nodeStatus.CLEAR && state.nodesStatus[i * 3] == state.nodesStatus[i * 3 + 1] && state.nodesStatus[i * 3 + 2] == ENUM.nodeStatus.CLEAR) {
            score += (state.nodesStatus[i * 3] == ENUM.nodeStatus.ME ? 4 : -4);
        }
        if (state.nodesStatus[i * 3] != ENUM.nodeStatus.CLEAR && state.nodesStatus[i * 3] == state.nodesStatus[i * 3 + 2] && state.nodesStatus[i * 3 + 1] == ENUM.nodeStatus.CLEAR) {
            score += (state.nodesStatus[i * 3] == ENUM.nodeStatus.ME ? 4 : -4);
        }
        if (state.nodesStatus[i * 3 + 1] != ENUM.nodeStatus.CLEAR && state.nodesStatus[i * 3 + 1] == state.nodesStatus[i * 3 + 2] && state.nodesStatus[i * 3] == ENUM.nodeStatus.CLEAR) {
            score += (state.nodesStatus[i * 3 + 1] == ENUM.nodeStatus.ME ? 4 : -4);
        }

        if (state.nodesStatus[i] != ENUM.nodeStatus.CLEAR && state.nodesStatus[i] == state.nodesStatus[3 + i] && state.nodesStatus[6 + i] == ENUM.nodeStatus.CLEAR) {
            score += (state.nodesStatus[i] == ENUM.nodeStatus.ME ? 4 : -4);
        }
        if (state.nodesStatus[i] != ENUM.nodeStatus.CLEAR && state.nodesStatus[i] == state.nodesStatus[6 + i] && state.nodesStatus[3 + i] == ENUM.nodeStatus.CLEAR) {
            score += (state.nodesStatus[i] == ENUM.nodeStatus.ME ? 4 : -4);
        }
        if (state.nodesStatus[3 + i] != ENUM.nodeStatus.CLEAR && state.nodesStatus[3 + i] == state.nodesStatus[6 + i] && state.nodesStatus[i] == ENUM.nodeStatus.CLEAR) {
            score += (state.nodesStatus[3 + i] == ENUM.nodeStatus.ME ? 4 : -4);
        }
    }

    if (state.nodesStatus[0] != ENUM.nodeStatus.CLEAR && state.nodesStatus[0] == state.nodesStatus[4] && state.nodesStatus[8] == ENUM.nodeStatus.CLEAR) {
        score += (state.nodesStatus[0] == ENUM.nodeStatus.ME ? 4 : -4);
    }
    if (state.nodesStatus[0] != ENUM.nodeStatus.CLEAR && state.nodesStatus[0] == state.nodesStatus[8] && state.nodesStatus[4] == ENUM.nodeStatus.CLEAR) {
        score += (state.nodesStatus[0] == ENUM.nodeStatus.ME ? 4 : -4);
    }
    if (state.nodesStatus[4] != ENUM.nodeStatus.CLEAR && state.nodesStatus[4] == state.nodesStatus[8] && state.nodesStatus[0] == ENUM.nodeStatus.CLEAR) {
        score += (state.nodesStatus[4] == ENUM.nodeStatus.ME ? 4 : -4);
    }
    if (state.nodesStatus[2] != ENUM.nodeStatus.CLEAR && state.nodesStatus[2] == state.nodesStatus[4] && state.nodesStatus[6] == ENUM.nodeStatus.CLEAR) {
        score += (state.nodesStatus[2] == ENUM.nodeStatus.ME ? 4 : -4);
    }
    if (state.nodesStatus[2] != ENUM.nodeStatus.CLEAR && state.nodesStatus[2] == state.nodesStatus[6] && state.nodesStatus[4] == ENUM.nodeStatus.ME) {
        score += (state.nodesStatus[2] == ENUM.nodeStatus.ME ? 4 : -4);
    }
    if (state.nodesStatus[4] != ENUM.nodeStatus.CLEAR && state.nodesStatus[4] == state.nodesStatus[6] && state.nodesStatus[2] == ENUM.nodeStatus.CLEAR) {
        score += (state.nodesStatus[4] == ENUM.nodeStatus.ME ? 4 : -4);
    }
    return score;
};

/**
 * get best next move cell id
 * AI is max player (alpha : ME)
 * @param state
 * @param lastMoveId
 * @returns {number}
 */
let getNextMove = (state, lastMoveId) => {
    let nextMove = -1;
    let availableMoves = helpers.GetAvailableMoves(state, lastMoveId);
    let alpha = -10000;
    availableMoves.forEach((cellId) => {
        state = helpers.playCell(state, cellId, ENUM.turn.ME);
        let newAlpha = getMax(alpha, betaPruning(state, cellId, 4, alpha));
        state = helpers.undoMove(state, cellId);
        if (alpha != newAlpha) {
            nextMove = cellId;
            alpha = newAlpha;
            console.log('cellId is: ' + cellId + ' new alpha is : ' + alpha);
        }
    });

    return nextMove;
};


module.exports = {
    getNextMove: getNextMove,
};
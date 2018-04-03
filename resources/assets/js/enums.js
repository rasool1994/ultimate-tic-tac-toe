/*
 |--------------------------------------------------------------------------
 | all enums type defined here
 |--------------------------------------------------------------------------
 */

const turn = {
    ME: 0,
    OPPONENT: 1
};

const cellStatus = {
    ME: 0,
    OPPONENT: 1,
    CLEAR: 2
};

const nodeStatus = {
    ME: 0,
    OPPONENT: 1,
    DRAW: 2,
    CLEAR: 3
};

const boardStatus = {
    ME: 0,
    OPPONENT: 1,
    CLEAR: 2
};

const gameMode = {
    ONLINE: 0,
    HUMAN: 1,
    AI: 2
};

export default {
    turn,
    cellStatus,
    nodeStatus,
    boardStatus,
    gameMode
};


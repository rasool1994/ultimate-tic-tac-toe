import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

/*
 / register Vue components
 */

import navbar from './vue/navbar.vue';
Vue.component('m-navbar', navbar);

import game from './vue/game.vue';
Vue.component('m-game', game);

import gameBoard from './vue/game-b.vue';
Vue.component('m-game-board', gameBoard);

import gameNode from './vue/game-node.vue';
Vue.component('m-game-node', gameNode);

import gameCell from './vue/game-cell.vue';
Vue.component('m-game-cell', gameCell);

import gameMovesHistory from './vue/game-moves-history.vue';
Vue.component('m-game-moves-history', gameMovesHistory);

import gameMove from './vue/game-move.vue';
Vue.component('m-game-move', gameMove);

import header from './vue/header.vue';
Vue.component('m-header', header);

import gameTurnIndicator from './vue/game-turn-indicator.vue';
Vue.component('m-game-turn-indicator', gameTurnIndicator);

import gameController from './vue/game-controller.vue';
Vue.component('m-game-controller', gameController);

import login from './vue/login.vue';
Vue.component('m-login', login);

import signup from './vue/signup.vue';
Vue.component('m-signup', signup);

import test from './vue/test.vue';
Vue.component('m-test', test);


// Define routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.

const routes = [
    {
        path: '',
        component: game
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/signup',
        component: signup
    }
];

//  Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    routes
});

export default router
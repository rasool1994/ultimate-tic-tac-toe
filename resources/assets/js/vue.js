/*
 |--------------------------------------------------------------------------
 | initialize vue,vueRouter, vuex
 |--------------------------------------------------------------------------
 */

import Vue from 'vue'
import store from './vuex' ;
import './vue-toasted' ;
//component will mount inside router
import router from './vue-router' ;

//create Vue app
const app = new Vue({
    router,
    store,
}).$mount('#app');

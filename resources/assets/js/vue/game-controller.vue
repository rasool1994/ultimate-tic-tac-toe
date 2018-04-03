<template>
    <div class="game-controllers">
        <button class="btn btn-primary" @click="requestOnlineGame">{{onlinePlayBtnTitle}}</button>
        <button class="btn btn-primary" @click="playWithAIAgent">{{AI_btnTitle}}</button>
    </div>
</template>

<style rel="stylesheet/scss" href="./style.css" lang="scss" type="text/scss" scoped>
    .game-controllers {
        text-align: center;
        margin-top: 130px;
    }
</style>

<script type="text/babel">

    import Vue from 'vue'
    import ENUM from '../enums'
    import {HTTP} from '../http'
    import AI from '../tic-tac-toe-player-AI-agent';


    export default {
        data(){
            return {
                onlinePlayBtnTitle: 'Play Online',
                AI_btnTitle: 'Play with AI'
            }
        },
        methods: {
            /**
             * request opponent for online game
             */
            requestOnlineGame () {
                console.log('online game requested');
                HTTP.post('/api/start-online-game', {})
                    .then(response => {
                        console.log(response.data);
                        if (response.data.success) {
                            this.$store.commit('resetGame');
                            this.$store.state.options.gameMode = ENUM.gameMode.ONLINE;
                            this.$store.state.gameChannel = response.data.channel;
                            if (response.data.isSearchingForOpponent) {
                                this.onlinePlayBtnTitle = 'Searching for opponent ...';
                                this.$store.state.gameTurn = ENUM.turn.OPPONENT
                            }
                            else {
                                this.onlinePlayBtnTitle = 'Make your first move';
                                this.$store.state.gameTurn = ENUM.turn.ME
                            }
                            var vue = this;
                            socketIo.emit('subscribe', response.data.channel);
                            socketIo.on('play', function (cellId) {
                                vue.$store.commit('play', cellId);
                            });
                        }
                    })
                    .catch(function (e) {
                        console.log(e.message);
                        if (e.response.status == 403) {
                            Vue.toasted.show('<span style="color: red;">for online playing, you must login first. <a href="#/login">Login</a> </span>');
                        }
                    });
            },
            /**
             * start playing with AI agent
             */
            playWithAIAgent(){
                this.$store.commit('resetGame');
                this.onlinePlayBtnTitle = 'Play Online';
                this.$store.state.options.gameMode = ENUM.gameMode.AI;

            }
        }
    }
</script>

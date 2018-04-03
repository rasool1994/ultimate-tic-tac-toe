<template>
    <div class="container">
        <m-game-controller></m-game-controller>
        <m-game-turn-indicator></m-game-turn-indicator>
        <!--<m-test></m-test>-->
        <div class="game">
            <m-game-board></m-game-board>
            <m-game-moves-history></m-game-moves-history>
        </div>
    </div>
</template>

<style rel="stylesheet/scss" href="./style.css" lang="scss" type="text/scss" scoped>
    .game {
        padding: 10px 0;
        display: flex;
        justify-content: center;
    }
</style>

<script type="text/babel">

</script>

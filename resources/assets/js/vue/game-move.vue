<template>
    <div class="history-move">{{cellId}}</div>
</template>

<style rel="stylesheet/scss" href="./style.css" lang="scss" type="text/scss" scoped>
    .history-move {
        padding-top: 5px;
        margin: 4px;
        border-radius: 50%;
        border: solid 1px #999999;
        vertical-align: middle;
        text-align: center;
        width: 30px;
        height: 30px;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    }

    .me {
        border: none;
        color: red;
    }

    .opponent {
        border: none;
        color: blue;
    }

    .clear {

    }

</style>

<script type="text/babel">
    module.exports = {
        props: ['id'],
        methods: {},
        data: () => {
            return {}
        },
        computed: {
            cellId(){
                return this.id + 1;
            }
        }
    }
</script>

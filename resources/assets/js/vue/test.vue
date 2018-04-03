<template>
    <!--<p>{{turn}}</p>-->
    <ul>
        <li v-for="user in users">{{user._id}}</li>
    </ul>

</template>

<style rel="stylesheet/scss" href="./style.css" lang="scss" type="text/scss" scoped>

</style>

<script type="text/babel">
    import {HTTP} from '../http';
    export default {
        data() {
            return {
                users: [],
                errors: []
            }
        },
        computed: {
            turn () {
                return (this.$store.state.gameTurn == 0 ? 'ME' : "OPPONENT(waiting...!)");
            }
        },
        created(){
            console.log(
                'created'
            );

            HTTP.post('api/get-token', {
                email: 'rasoolmai93@gmail.com',
                password: 'password'
            }).then(response => {
            }).catch(e => {
                this.errors.push(e)
            });

            HTTP.get('/api/users')
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.users = response.data;
                }).catch(e => {
                    console.log(e.message);
                    this.errors.push(e);
                }
            );
        }
    }
</script>

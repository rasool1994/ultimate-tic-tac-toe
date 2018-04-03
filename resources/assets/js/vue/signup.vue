<template>
    <div class="col-sm-4 col-sm-offset-4">
        <h2>Sign Up</h2>
        <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
        </div>
        <div class="form-group">
            <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your username"
                    v-model="credentials.email">
        </div>
        <div class="form-group">
            <input
                    type="password"
                    class="form-control"
                    placeholder="Enter your password"
                    v-model="credentials.password">
        </div>
        <button class="btn btn-primary" @click="submit()">Sign Up</button>
    </div>
</template>

<style rel="stylesheet/scss" href="./style.css" lang="scss" type="text/scss" scoped>

</style>

<script type="text/babel">
    import {HTTP} from '../http';

    export default {
        data(){
            return {
                // We need to initialize the component with any
                // properties that will be used in it
                credentials: {
                    email: '',
                    password: ''
                },
                error: ''
            }
        },
        methods: {
            submit() {
                HTTP.post('/api/signup', {
                    email: this.credentials.email,
                    password: this.credentials.password
                }).then(response => {
                    console.log(response.data);
                    if (response.data.success) {
                        this.$router.push('/');
                    }
                }).catch(function (e) {
                    console.log(e.message);
                });
            }
        }

    }
</script>

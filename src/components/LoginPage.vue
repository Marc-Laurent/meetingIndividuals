<template>
    <v-container>
        <v-layout column wrap>
            <v-flex xs12 sm6>
                <form>
                    <v-text-field
                        label="E-mail"
                        id="E-mail"
                        v-model="login"
                    ></v-text-field>
                    <v-text-field
                        label="Password"
                        id="pass"
                        v-model="pass"
                        type="password"
                    ></v-text-field>
                    <v-btn color="blue" @click="sendLogin">Login</v-btn>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import axios from 'axios'
export default {
    name: 'loginPage',
    data() {
        return {
            pass: '',
            login: ''
        }
    },
    methods: {
        sendLogin: function() {
            axios
            .post('http://localhost:3000/api/users/login/', {"email" : this.login, "password": this.pass})
            .then(() => {
                location.reload()
                document.location = "/"
            })
        }
    }
}
</script>

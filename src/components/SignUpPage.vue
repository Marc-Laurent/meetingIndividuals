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
                    ></v-text-field>
                    <v-btn color="blue" @click="signup">S'inscrire</v-btn>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    name: "sign up",
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        signup: function() {
            axios  
            .post('http://localhost:3000/api/signup/', {'login' : this.email, 'password': this.password})
            .then(() => {
                document.location = "/login"
            })
        }
    },
}
</script>
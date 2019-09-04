<template>
<v-layout>
    <v-toolbar blue color="primary">
        <v-toolbar-title class="white--text">Entre paillasons</v-toolbar-title>
        <v-btn icon  to="/">
          <v-icon>home</v-icon>
        </v-btn>
        <v-spacer/>
        <v-btn icon v-if="logged" to="/annonce/accepted">
          <v-icon>assignment</v-icon>
        </v-btn>
        <v-btn icon v-if="logged" @click="logout()">
          <v-icon>eject</v-icon>
        </v-btn>
        <v-btn icon v-else to="/login">
          <v-icon>perm_identity</v-icon>
        </v-btn>
    </v-toolbar>
</v-layout>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  websiteTitle: 'D&D',
  data() {
    return {
      logged: false
    }
  },
  props: {
    msg: String
  },
  methods: {
    logout : function() {
      axios
        .post('http://localhost:3000/api/users/logout/', {"email" : this.login, "password": this.pass})
        .then(() => {
            location.reload()
            document.location = "/"
        })
    }
  },
  mounted() {
    axios.get('http://localhost:3000/api/users')
            .then(response => (
            response.data.user.is_login === true ? this.logged = true: null
))
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<template>
    <v-container>
        <v-layout column wrap>
            <v-flex xs12 sm6>
                <v-img
                    key="image"
                    class="white--text"
                    height="200px"
                    :src="annonce.pictures.length != 0 ? annonce.pictures[0] : 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'"
                />
                <v-list two-line>

                  <v-list-tile >
            <v-list-tile-action>
              <v-icon color="#FF5A5F">bookmark</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{annonce.label}}</v-list-tile-title>
              <v-list-tile-sub-title>Titre</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>


          <v-list-tile >
            <v-list-tile-action>
              <v-icon color="#FF5A5F">phone</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{annonce.contact}}</v-list-tile-title>
              <v-list-tile-sub-title>Contact</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>
          <v-list-tile >
            <v-list-tile-action>
              <v-icon color="#FF5A5F">today</v-icon>
            </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{annonce.started_on | moment('MM/DD/YYYY') }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile xs>
            <v-list-tile-action>
              <v-icon color="#FF5A5F">subject</v-icon>
            </v-list-tile-action>

                    <div>{{annonce.description}}</div>
            </v-list-tile>

            <v-list-tile >
            <v-list-tile-action>
              <v-icon color="#FF5A5F">location_on</v-icon>
            </v-list-tile-action>

                <v-list-tile-content>
                    <v-btn @click="goTo(annonce.url_google_map)">Où?</v-btn>
                </v-list-tile-content>
            </v-list-tile>

            <v-btn @click="acceptRequest(annonce._id)">
                    <v-icon color="#FF5A5F" large right>how_to_vote</v-icon>
            </v-btn>

            </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    name : "Annonce",
    data () {
        return {
            annonce : {},
            displayed_item: ['label', 'description']
        }
    },
    created () {
        axios.get('http://localhost:3000/api/annonces/' + this.$route.params.id)
            .then(response => (this.annonce = response.data.article))
    },
    methods : {
      goTo : function (href) {
        document.location = href
      },
        acceptRequest : function(id) {
          axios.get('http://localhost:3000/api/users/')
            .then(response => {
              axios
                .post('http://localhost:3000/api/users/add/article',
                { "user": {
                    "_id": response.data.user._id
                  },
                  "article": {
                    "_id": id
                  }
                })
                .then(() => {
                    document.location = "/annonce/accepted"
                })
              })

        },
        removeRequest : function(id) {
          axios.get('http://localhost:3000/api/users/')
            .then(response => {
              axios
                .post('http://localhost:3000/api/users/remove/article',
                { "user": {
                    "_id": response.data.user._id
                  },
                  "article": {
                    "_id": id
                  }
                })
                .then(() => {
                    document.location = "/annonce/accepted"
                })
              })

        }
    }
}
</script>

<style>

</style>

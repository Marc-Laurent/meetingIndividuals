<template>
<v-container  grid-list-xs>
        <v-layout column wrap>
            <v-flex xs12 sm6>
                <form action="/api/annonce/">
                <v-text-field
                    label="Titre"
                    id="label"
                    v-model="label"
                ></v-text-field>
                <v-text-field
                    label="Description"
                    id="desc"
                    v-model="desc"
                ></v-text-field>
                <v-text-field
                    label="Url de l'image"
                    id="picture"
                    v-model="picture"
                ></v-text-field>
                <v-text-field
                    label="Date d'effet"
                    id="started_on"
                    type="date"
                    v-model="started_on"
                ></v-text-field>
                <v-text-field
                    label="Url de google map"
                    id="google_map"
                    v-model="url_google_map"
                ></v-text-field>
                <v-text-field
                    label="contact"
                    id="contact"
                    v-model="contact"
                ></v-text-field>
                <v-btn color="blue" @click="createAnnonce">Create</v-btn>
                </form>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    name: "CreateAnnonce",
    data() {
        return {
            label: '',
            desc: '',
            picture: '',
            started_on: '',
            url_google_map: '',
            contact: ''
        }
    },
    methods : {
        createAnnonce : function() {
            // eslint-disable-next-line
            console.log(this.label, this.desc, this.picture)
        axios
            .post('http://localhost:3000/api/annonces/', {'reference' : this.label.replace(/ /g,"_"), 'label' : this.label, 'description': this.desc, 'pictures' : [this.picture], 'started_on' : new Date(this.started_on), 'url_google_map': this.url_google_map, 'contact' : this.contact})
            .then(document.location = "/")
        }
    }
}
</script>

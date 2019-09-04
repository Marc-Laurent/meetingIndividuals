<template>
    <v-container  grid-list-xs>
        <v-layout column wrap>
            <v-flex xs12 sm6>
                <v-text-field
                    label="Recherche"
                    single-line
                    append-icon="search"
                    v-model="search"
                ></v-text-field>
        </v-flex>
        <v-flex v-for="i in filterArticles" :key="i" xs3 pa-5>
            <Tile v-if="i.Receiver != user" :label="i.label" :desc="i.description" :img="i.pictures[0]" :reference="i.reference" :location="i._id"/>
        </v-flex>
        <v-btn color="#FF5A5F" fab fixed bottom right large :to="locationCreate">Create</v-btn>
        </v-layout>
    </v-container>
</template>

<script>
import Tile from '@/components/Tile'
import axios from 'axios'
export default {
    name : "Annonce",
    components: {Tile},
    data () {
        return {
            articles : [],
            search:'',
            locationCreate: '/annonce/create',
            user: ''
        }
    },
    created () {
        axios
        .get('http://localhost:3000/api/annonces/')
        .then(response => {
            this.articles = response.data.articles
            this.user = response.data.user._id        
        })
    },
    computed: {
        filterArticles: function() {
            return this.articles.filter((item)=> {
                return item.label.toLowerCase().match(this.search)
            })

        }
    },
}
</script>

<style>

</style>

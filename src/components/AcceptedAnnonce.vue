<template>
    <v-container  grid-list-xs>
        <v-layout column wrap>
            <v-flex xs12 sm6>
                <v-text-field
                    label="Rechercher"
                    single-line
                    append-icon="search"
                    v-model="search"
                ></v-text-field>
            </v-flex>
            <v-flex v-for="i in filterArticles" :key="i" xs3 pa-5>
                <Tile :label="i.label" :desc="i.description" :img="i.pictures[0]" :reference="i.reference" :location="i._id"/>
            </v-flex>
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
        }
    },
    created () {
        axios.get('http://localhost:3000/api/users/')
            .then(response => (response.data.user.is_login === true ? this.getArticles(response.data.user.articles) : document.location ="/login"))
    },
    methods: {
        getArticles : function(array) {
            for(var el in array){
                axios.get('http://localhost:3000/api/annonces/' + array[el])
                    .then(response => (this.articles.push(response.data.article)))
            }
        }
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

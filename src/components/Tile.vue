<template>
    <v-card>
        <v-img
            class="white--text"
            height="200px"
            :src="newSrc"
        >
            <v-container fill-height fluid>
            <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                <span class="headline">{{label}}</span>
                </v-flex>
            </v-layout>
            </v-container>
        </v-img>
        <v-card-title>
            <div>
            <span>{{shortTitle}}</span>
            </div>
        </v-card-title>
        <v-card-actions>
            <v-btn flat color="#FF5A5F" :to="href" >See more</v-btn>
        </v-card-actions>
        </v-card>
</template>

<script>
export default {
    name: 'Tile',
    props : ['label', 'desc', 'img', 'reference', 'location'],
    data () {
        return {
            shortTitle : this.getShortTitle(),
            href: "/annonce/" + this.location,
            newSrc: this.getNewSrc()
        }
    },
    methods: {
        getShortTitle : function() {
            if(this.desc.length > 100)
                return this.desc.substring(0,100) + "..."
            else 
                return this.desc
        },
        getNewSrc : function() {
            if(!this.img)
                return "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            else 
                return this.img
        }
    },
}
</script>

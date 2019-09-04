<template>
  <v-app>
    <v-container fill-height fluid>
      <v-layout column fill-height align-space-around ma-5>
        <Header/> 
        <router-view/>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components: {
    Header,
  },
  data () {
    return {
      //
    }
  }
}
</script>
<style>

</style>

<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <Home/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Home from '@/components/home'
export default {
  name : "HomePage",
  components : {
    Home
  }
}
</script>

<style>

</style>

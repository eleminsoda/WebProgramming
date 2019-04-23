<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <film-brief v-for="film in films" v-bind:key="film._id" v-bind:film="film"></film-brief>
  </div>
</template>

<script>
import FilmBrief from "./components/FilmBrief.vue";
import films from "./assets/films.json";

export default {
  name: "app",
  data: function() {
    return {
      films
    }
  },
  components: {
    FilmBrief
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

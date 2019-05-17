<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import FilmList from "./components/FilmList.vue";
import DetailPage from "./components/DetailPage.vue";

export default {
  name: "app",
  data: function() {
    return {};
  },
  components: {
    FilmList,
    DetailPage
  },
  computed: {}
};
</script>

<style>
</style>

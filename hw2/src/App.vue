<template>
  <div id="app">
    <div v-if="this.detailPageIndex != -1">
      <film-brief v-for="film in filmList[pageIndex-1]" v-bind:key="film._id" v-bind:film="film"></film-brief>
      <div class="buttons">
        <jump-button
          class="button"
          v-for="index in buttonIndexList"
          :key="index.id"
          v-bind:index="index"
          v-on:jump-page="pageIndex = index.id"
        ></jump-button>
      </div>
    </div>
    <div v-else>
      <page-detail v-bind:film="this.films[0]"></page-detail>
    </div>
  </div>
</template>

<script>
import FilmBrief from "./components/FilmBrief.vue";
import films from "./assets/films.json";
import JumpButton from "./components/JumpButton.vue";
import PageDetail from "./components/DetailPage.vue";

const GroupCount = 10;

export default {
  name: "app",
  data: function() {
    return {
      films,
      pageIndex: 1,
      pageCount: Math.ceil(films.length / GroupCount),
      detailPageIndex: -1
    };
  },
  components: {
    FilmBrief,
    JumpButton,
    PageDetail
  },
  computed: {
    filmList: function() {
      let finalList = [];
      for (let i = 0; i < this.pageCount; i++) {
        let temp = 0;
        if (i < this.pageCount - 1) {
          temp = this.films.slice(i * GroupCount, (i + 1) * GroupCount);
          finalList.push(temp);
        } else {
          temp = this.films.slice(i * GroupCount);
          finalList.push(temp);
        }
      }
      // console.log(finalList);
      return finalList;
    },
    buttonIndexList: function() {
      let indexes = [];
      for (let i = 1; i <= this.pageCount; i++) {
        let temp = { id: i };
        indexes.push(temp);
      }
      return indexes;
    }
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
.buttons {
  width: 300px;
  margin: 50px auto;
  padding-bottom: 100px;
}
.button {
  float: left;
}
</style>

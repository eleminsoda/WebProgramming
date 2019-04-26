<template>
  <div id="filmlist">
    <film-brief
      v-for="(film, index) in filmList[pageIndex-1]"
      v-bind:key="film._id"
      v-bind:index="index + groupCount*(pageIndex-1)"
      v-bind:film="film"
    ></film-brief>
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
</template>

<script>
import FilmBrief from "../components/FilmBrief.vue";
import films from "../assets/films.json";
import JumpButton from "../components/JumpButton.vue";

const GroupCount = 10;

export default {
  name: "FilmList",
  data: function() {
    return {
      films,
      pageIndex: 1,
      pageCount: Math.ceil(films.length / GroupCount),
      groupCount: GroupCount
    };
  },
  components: {
    FilmBrief,
    JumpButton
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
#filmlist {
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

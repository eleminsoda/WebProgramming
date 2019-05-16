<template>
  <div id="filmlist">
    <div id="search-box" v-if="searchedFilm != -1">
      <input v-model="filmToSearch" placeholder="请输入想搜索的电影">
      <button @click="seachFilm">搜索</button>
    </div>
    <div id="searchError" v-if="searchedFilm == -1">
      <p>抱歉，未找到您搜索的电影</p>
      <button @click="returnToPage">返回</button>
    </div>
    <div v-else>
      <film-brief
        v-for="(film, index) in films"
        v-bind:key="film._id"
        v-bind:index="film._id"
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
  </div>
</template>

<script>
import FilmBrief from "../components/FilmBrief.vue";
// import films from "../assets/films.json";
import JumpButton from "../components/JumpButton.vue";

let mongodb = require("../mongodb.js");

const GroupCount = 10;

export default {
  name: "FilmList",
  data: function() {
    return {
      films: [],
      pageIndex: 1,
      filmToSearch: "",
      searchedFilm: 0,
      pageCount: 0,
      groupCount: GroupCount
    };
  },
  components: {
    FilmBrief,
    JumpButton
  },
  computed: {
    buttonIndexList: function() {
      let indexes = [];
      for (let i = 1; i <= this.pageCount; i++) {
        let temp = { id: i };
        indexes.push(temp);
      }
      return indexes;
    }
  },
  created: function() {
    this.films = mongodb.get_films(this.pageIndex);
    this.pageCount = Math.ceil(10000 / GroupCount)
  },
  methods: {
    seachFilm: function() {
      let _id = mongodb.search_film(this.filmToSearch);
      if (_id != null) {
        this.$router.push({ name: "detail", params: { id: _id } });
      } else {
        this.searchedFilm = -1;
      }
    },
    returnToPage: function() {
      this.searchedFilm = 0;
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
#search-box {
  margin-bottom: 50px;
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

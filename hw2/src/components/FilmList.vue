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
      filmToSearch: "",
      searchedFilm: 0,
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
  },
  methods: {
    seachFilm: function() {
      let found = false;
      let index = -1;
      for (let i = 0; i < films.length; i++) {
        let film = films[i];
        if (this.matchingFilmName(film, this.filmToSearch)) {
          found = true;
          index = i;
          break;
        }
      }
      if (found) {
        this.$router.push({ name: "detail", params: { id: index } });
      } else {
        this.searchedFilm = -1;
      }
    },
    returnToPage: function() {
      this.searchedFilm = 0;
    },
    matchingFilmName: function(film, inputName) {
      let originalTitle = "";
      originalTitle += film.title;
      let index = originalTitle.indexOf(" ");
      let input = originalTitle[index - 1];
      let isPunc =
        (input >= "A" && input <= "Z") || (input >= "a" && input <= "z");
      if (!isPunc) {
        return (
          originalTitle.slice(0, index) == inputName ||
          originalTitle.slice(index + 1) == inputName
        );
      } else {
        return originalTitle == inputName;
      }
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

<template>
  <div class="film-brief">
    <div class="poster">
      <img :src="film.poster">
    </div>

    <div class="info">
      <div class="heading">{{film.title}}</div>
      <div class="ratings">{{film.rating.average}}</div>
      <div class="ontime">{{film.pubdate}}</div>
      <div class="type">{{film.genres}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilmBrief",
  props: ['film']
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

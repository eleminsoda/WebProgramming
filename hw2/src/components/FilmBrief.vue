<template>
  <div class="film-brief">
    <div class="poster">
      <img :src="imgSrc">
    </div>

    <div class="info">
      <router-link
        :to="{
        name: 'detail',
        params: {
          id: index
        }
        }"
      >
        <div class="heading" v-html="title"></div>
      </router-link>

      <div class="ratings">{{film.rating.average}}</div>
      <div class="ontime">{{pubdate}}</div>
      <div class="type">{{genres}}</div>
    </div>
  </div>
</template>

<script>
import errorImg from "../assets/imgErr.jpg";

export default {
  name: "FilmBrief",
  props: ["film", "index"],
  data: function() {
    return {
      imgSrc: "",
      imgErrSrc: errorImg
    };
  },
  methods: {
    loadImg(resolve, reject) {
      let originImgSrc = this.film.poster;
      let img = new Image();
      img.src = originImgSrc;

      img.onload = function() {
        resolve({
          src: img.src
        });
      };

      img.onerror = function(e) {
        reject(e);
      };
    }
  },
  created: function() {
    this.loadImg(
      response => {
        this.imgSrc = response.src;
      },
      reject => {
        console.log("图片加载失败");
        this.imgSrc = this.imgErrSrc;
      }
    );
  },
  computed: {
    title: function() {
      let originalTitle = "";
      originalTitle += this.film.title;
      let index = originalTitle.indexOf(" ");
      let input = originalTitle[index - 1];
      let isPunc =
        (input >= "A" && input <= "Z") || (input >= "a" && input <= "z");
      if (!isPunc) {
        return (
          originalTitle.slice(0, index) +
          "<br>" +
          originalTitle.slice(index + 1)
        );
      } else {
        return originalTitle;
      }
    },
    pubdate: function() {
      let dates = this.film.pubdate;
      if (dates[0] === "") {
        return "上映时间未知";
      } else {
        return dates[0];
      }
    },
    genres: function() {
      let genres = this.film.genres;
      let str = "";
      for (let i = 0; i < genres.length; i++) {
        str += genres[i];
        if (i !== genres.length - 1) {
          str += " / ";
        }
      }
      return str;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.film-brief {
  height: 200px;
  width: 500px;
  margin: 10px auto;
  position: relative;
}
.poster {
  height: 180px;
  width: 30%;
  float: left;
}
.poster img {
  height: 180px;
  width: 135px;
}
.info {
  position: absolute;
  transform: translate(0, -50%);
  top: 50%;
  right: 0;
  width: 65%;
  vertical-align: center;
  font-family: "Courier New", Courier, monospace;
}
.heading {
  font-size: 15pt;
  font-weight: bold;
}
</style>

<template>
  <div class="detail-page">
    <div class="poster">
      <img :src="this.imgSrc">
    </div>
    <div class="details">
      <ul>
        <li id="title" v-html="title"></li>
        <li id="director">{{directors}}</li>
        <li id="writers">{{writers}}</li>
        <li id="casts">{{casts}}</li>
        <li id="genres">{{genres}}</li>
        <li id="duration">{{duration}}</li>
        <li id="pubdate">{{pubdate}}</li>
        <li id="summary"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import errorImg from "../assets/imgErr.jpg";

export default {
  name: "DetailPage",
  props: ["film"],
  data: function() {
    return {
      imgSrc: "",
      imgErrSrc: errorImg,
      duration: "片长：" + this.film.duration + "分钟",
      summary: "简介：" + this.film.summary
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
    },
    getList(name, list) {
      let result = "";
      result += name;
      for (let i = 0; i < list.length; i++) {
        result += list[i].name;
        if (i !== list.length - 1) {
          result += " / ";
        }
      }
      return result;
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
    directors: function() {
      return this.getList("导演：", this.film.directors);
    },
    writers: function() {
      return this.getList("编剧：", this.film.writers);
    },
    casts: function() {
      return this.getList("主演：", this.film.casts);
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
    },
    pubdate: function() {
      let dates = this.film.pubdate;
      if (dates[0] === "") {
        return "上映时间未知";
      } else {
        return "上映时间：" + dates[0];
      }
    }
  }
};
</script>

<style>
</style>

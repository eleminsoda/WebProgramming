<template>
  <div class="detail-page">
    <div class="poster">
      <img :src="imgSrc">
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
        <li id="summary">{{summary}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import errorImg from "../assets/imgErr.jpg";
import service from "../services/GetService.js";

export default {
  name: "DetailPage",
  props: [],
  data: function() {
    return {
      id_: this.$route.params.id,
      film: {},
      imgSrc: "",
      imgErrSrc: errorImg,
      duration: "",
      summary: ""
    };
  },
  methods: {
    loadImg: function(resolve, reject) {
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
    getList: function(name, list) {
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
  created: async function() {
    try {
      let temp = await service.get_one_film(this.$route.params.id);
      this.film = temp[0];
    } catch (error) {
      console.log(error);
    }

    this.duration = "片长：" + this.film.duration + "分钟";
    this.summary = "简介：" + this.film.summary;
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
      return "类型：" + str;
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
.detail-page {
  width: 600px;
  margin: 0 auto;
  margin-bottom: 50px;
  position: relative;
  overflow: inherit;
}

.poster,
.poster img {
  width: 150px;
  height: 250px;
}

.details {
  position: absolute;
  left: 180px;
  top: 0px;
  width: 420px;
  text-align: left;
}

.details ul {
  list-style-type: none;
  padding: 0px;
}

.details ul li {
  margin-bottom: 5px;
}
#title {
  font-size: 16pt;
  font-weight: bold;
}
#summary {
  margin-bottom: 50px;
}
</style>

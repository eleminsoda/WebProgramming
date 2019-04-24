<template>
  <div id="button-view">
    <button v-on:click="$emit('jump-page')">{{index.id}}</button>
  </div>
</template>

<script>
export default {
  name: "JumpButton",
  props: ["index"],
  // data: function() {
  //   return {
  //     films
  //   };
  // }
};
</script>

<style scoped>
button{
  height: 20px;
  width: 30px;
  text-align: center;
}
</style>

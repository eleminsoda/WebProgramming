<template>
  <div id="button">
    <button @click="link">{{id}}</button>
  </div>
</template>

<script>
export default {
  name: "JumpButton",
  props: ["id", "link"],
  data: function() {
    return {
      films
    };
  }
};
</script>

<style scoped>
.button {
    
}
</style>

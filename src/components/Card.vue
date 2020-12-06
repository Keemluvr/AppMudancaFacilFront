<template>
  <div class="content">
    <div class="image"></div>
  </div>
</template>

<script>
export default {
  name: "Card",
  data: function () {
    return {};
  },
};
</script>

<style scoped>
.content {
  width: 33%;
  min-height: 500px;
  border-radius: 20px;
  background-color: red;
}
.image {
  min-height: 220px;
  min-width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: blue;
}
</style>
<template>
  <div>
    <div class="list-cards">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  name: "Home",
  components: {
    Card,
  },
  data() {
    return {
      immobile: null,
    };
  },
  mounted() {},
};
</script>


<style scoped>
.list-cards {
  margin: 50px 5vw 0 50px;
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 50px;
}
</style>

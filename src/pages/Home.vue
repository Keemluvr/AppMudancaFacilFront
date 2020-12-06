<template>
  <div>
    <div class="list-cards">
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
  margin: 0 5vw;
  height: 100%;
  background-color: yellow;
}
</style>
